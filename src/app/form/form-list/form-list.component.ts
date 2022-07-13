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

  formGroup: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //check if there is id in url
    if (this.route.snapshot.url[this.route.snapshot.url.length - 1]) {
      this.store.dispatch(FormActions.retrieveStart({ id: this.route.snapshot.url[this.route.snapshot.url.length - 1].toString() }));
    }

    this.storeSub = this.store.select("form").subscribe((data) => {
      if (data.errorMsg) {
        this.router.navigate(["/"]);
      }
      if (data.done) {
        this.form = data.form;
        this.formName = data.form.options.name || "Unnamed Form 🤷";
        this.questions = data.questions;

        const formControls = {};

        for (let question of this.questions) {
          // if (question.type.constructor.name === 'MultipleQuestion' ) {
          //   for (let [index, value] of question.type.answers.entries()) {
          //     formControls[question.options.index + 'q' + index] = new FormControl(null, question.options.required ? Validators.required : null);
          //   }
          // } else {
            formControls[question.options.index + "q"] = new FormControl(null, question.options.required ? Validators.required : null);
          // }
        }

        console.log(formControls);
        

        this.formGroup = new FormGroup(formControls);

        this.formGroup.statusChanges.subscribe((status) => {
          this.valid = status === "VALID" ? true : false;
        });
      }
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
