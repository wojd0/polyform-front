import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subscription, take } from "rxjs";
import { BeerService } from "src/app/beer.service";
import Question, { DateQuestion, FileQuestion, MultipleQuestionOptions, NumberQuestion, TextQuestion } from "src/app/shared/models/question.model";
import QuestionModel, { MultipleQuestion } from "src/app/shared/models/question.model";
import { AppState } from "src/app/app.reducer";
import { environment } from "src/environments/environment";
import { Form } from "../shared/models/form.model";

import * as FormActions from "./store/form.actions";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.scss"],
})
export class FormListComponent implements OnInit, OnDestroy {
  form: Form;
  formName: string;
  questions: Question<any, any>[];
  valid: boolean = false;
  values = [];
  storeSub: Subscription;
  notFilled = true;

  nestedFormGroups: FormGroup[] = [];

  required: string[][] = [];

  formGroup: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>, private beerService: BeerService, private router: Router, private actions: Actions) {}

  ngOnInit(): void {
    const formId = this.router.url.substring(this.router.url.lastIndexOf("/") + 1);

    //check if there is id in url
    if (formId.length === environment.idLength) {
      this.store.dispatch(FormActions.retrieveStart({ id: formId }));
    }else{
      this.router.navigate(['/'])
    }

    //await form data
    this.storeSub = this.store.select("form").subscribe((data) => {
      //redir to home on error
      if (data.errorMsg) {
        this.router.navigate(["/"]);
      }
      //load form into the componenent if it is in state
      if (data.form) {
        this.form = data.form;
        this.formName = data.form.name || "Unnamed Form 🤷";
        this.questions = data.questions;

        

        const formControls = {};
        let i = 0;
        for (let question of this.questions) {
          //handle multiple option question
          if (question.type === 'multiple' && question.details.limit !== 1) {
             //handle radio type question
             const answerControls = {};
             for (let [index, value] of question.details.answers.entries()) {
               const answerName = question.index + "q" + index;
               answerControls[answerName] = new FormControl(false);
             }
             this.nestedFormGroups[question.index] = new FormGroup(answerControls);
             formControls[question.index + "q"] = this.nestedFormGroups[question.index];
          }else{
            formControls[question.index + "q"] = new FormControl(null, question.required ? Validators.required : null);
          }
        }
        this.formGroup = new FormGroup(formControls);
      }
    });

    //catch end event
    this.actions.pipe(ofType(FormActions.sendSuccess), take(1)).subscribe(() => {
      this.beerService.modal.next({type: 'general', content: {
        msg: "Thank you for filling out the form.",
        sub: "Your answers have been sent to the form's creator.",
        redirect: true
      }});
      this.router.navigate(['/'])}
    )

  }

  onSubmit() {
    this.store.dispatch(FormActions.sendStart({ values: this.flatValues(this.formGroup.value), questions: this.questions }));
  }

  flatValues(values: { [key: string]: { [key: string]: string } | string }) {
    return Object.values(values).reduce((prev, curr, qindex) => {
      return typeof curr === "object" && curr ? [
        ...prev,
        Object.values(curr)
        .map((value, aindex) => {        
        return value ? (<MultipleQuestion> this.questions[qindex]).details.answers[aindex] : null;
        })
        .filter(val => !!val)
    ] : [...prev, curr];
    }, []);
  }

  checkQuestionType(question: any){
    switch(question.type){
      case 'text':
        return question as TextQuestion;
      case 'number':
        return question as NumberQuestion;
      case 'multiple':
        return question as MultipleQuestion;
      case 'date':
        return question as DateQuestion;
      case 'file':
        return question as FileQuestion;
      default:
        return null;
    }
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
