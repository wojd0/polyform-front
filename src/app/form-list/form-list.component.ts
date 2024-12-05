import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subscription, take } from "rxjs";
import { BeerService } from "src/app/beer.service";
import { FormModel } from "src/app/shared/models/form.model";
import QuestionModel, { MultipleQuestion } from "src/app/shared/models/question.model";
import { AppState } from "src/app/store/app.reducer";
import { environment } from "src/environments/environment";

import * as FormActions from "./store/form.actions";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.scss"],
})
export class FormListComponent implements OnInit, OnDestroy, AfterViewInit {
  form: FormModel;
  formName: string;
  questions: QuestionModel[];
  valid: boolean = false;
  values = [];
  storeSub: Subscription;
  notFilled = true;

  nestedFormGroups: UntypedFormGroup[] = [];

  required: string[][] = [];

  formGroup: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private store: Store<AppState>, private beerService: BeerService, private router: Router, private actions: Actions) {}

  ngOnInit(): void {
    const formId = this.router.url.substring(this.router.url.lastIndexOf("/") + 1);

    this.actions.pipe(ofType(FormActions.sendSuccess), take(1)).subscribe(() => {
      this.beerService.modal.next({type: 'general', content: {
        msg: "Thank you for filling out the form.",
        sub: "Your answers have been sent to the form's creator.",
        redirect: true
      }});
      this.router.navigate(['/'])}
    )

    //check if there is id in url
    if (formId.length === environment.idLength) {
      this.store.dispatch(FormActions.retrieveStart({ id: formId }));
    }
  }

  ngAfterViewInit(): void {
    //watch if the form is in the state
    this.storeSub = this.store.select("form").subscribe((data) => {
      //redir to home on error
      if (data.errorMsg) {
        this.router.navigate(["/"]);
      }
      //load form into the componenent if it is in state
      if (data.form) {
        this.form = data.form;
        this.formName = data.form.options.name || "Unnamed Form 🤷";
        this.questions = data.questions;

        const formControls = {};
        let i = 0;
        for (let question of this.questions) {
          //handle multiple option question
          if (question.type.answers && question.type.limit !== 1) {
            //handle radio type question
            const answerControls = {};
            for (let [index, value] of question.type.answers.entries()) {
              const answerName = question.options.index + "q" + index;
              answerControls[answerName] = new UntypedFormControl(false);
            }
            this.nestedFormGroups[question.options.index] = new UntypedFormGroup(answerControls);
            formControls[question.options.index + "q"] = this.nestedFormGroups[question.options.index];
          } else {
            formControls[question.options.index + "q"] = new UntypedFormControl(null, question.options.required ? Validators.required : null);
          }
        }
        this.formGroup = new UntypedFormGroup(formControls);
        console.log(this.questions);
             
      }
    });
  }

  onSubmit() {
    //TODO: send data to api
    this.store.dispatch(FormActions.sendStart({ values: this.flatValues(this.formGroup.value) }));
  }

  flatValues(values: { [key: string]: { [key: string]: string } | string }) {
    return Object.values(values).reduce((prev, curr, qindex) => {
      return typeof curr === "object" && curr ? [
        ...prev,
        Object.values(curr)
        .map((value, aindex) => {        
        return value ? <MultipleQuestion> this.questions[qindex].type.answers[aindex] : null;
        })
        .filter(val => !!val)
    ] : [...prev, curr];
    }, []);
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
