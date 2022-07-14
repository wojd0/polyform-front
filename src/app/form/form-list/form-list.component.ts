import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of, sample, Subject, Subscription } from "rxjs";
import { FormModel } from "src/app/shared/form.model";
import QuestionModel, { MultipleQuestion } from "src/app/shared/question.model";
import Question, { TextQuestion } from "src/app/shared/question.model";
import { AppState } from "src/app/store/app.reducer";

import * as FormActions from "../store/form.actions";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.scss"],
})
export class FormListComponent implements OnInit, OnDestroy {
  form: FormModel;
  formName: string;
  questions: QuestionModel[];
  valid: boolean = false;
  values = [];
  storeSub: Subscription;
  notFilled = true;

  required: string[][] = [];

  formGroup: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //check if there is id in url
    if (this.route.snapshot.url[this.route.snapshot.url.length - 1]) {
      this.store.dispatch(FormActions.retrieveStart({ id: this.route.snapshot.url[this.route.snapshot.url.length - 1].toString() }));
    }

    //watch if the form is in the state
    this.storeSub = this.store.select("form").subscribe((data) => {
      //redir to home on error
      if (data.errorMsg) {
        this.router.navigate(["/"]);
      }
      //load form into the componenent if it is in state
      if (data.done) {
        this.form = data.form;
        this.formName = data.form.options.name || "Unnamed Form 🤷";
        this.questions = data.questions;

        const formControls = {};

        for (let question of this.questions) {
          //handle multiple option question
          if (question.type.answers) {
            const answersControlNames = [];

            for (let [index, value] of question.type.answers.entries()) {
              const formControlName = question.options.index + "q" + index;

              formControls[formControlName] = new FormControl(false);

              if (question.options.required) answersControlNames.push(formControlName);
            }

            if (question.options.required) this.required.push(answersControlNames);
          } else {
            formControls[question.options.index + "q"] = new FormControl(null, question.options.required ? Validators.required : null);
          }
        }

        this.formGroup = new FormGroup(formControls);

        //utility for grayed-out send button
        this.formGroup.statusChanges.subscribe((status) => {
          this.valid = status === "VALID" ? true : false;

          for (let group of this.required) {
            let noAnswer = true;

            for (let answer of group) {
              const answerValue = !!this.formGroup.get(answer).value;

              if (answerValue) {
                noAnswer = false;
                break;
              }
            }
            if (noAnswer) {
              this.valid = false;
              break;
            }
          }
        });

        this.formGroup.valueChanges.subscribe((values) => {
          console.log(values);
        });
      }
    });
  }

  onSubmit() {
    //TODO: send data to api
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
