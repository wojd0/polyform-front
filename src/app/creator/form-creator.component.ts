import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import Question, { MultipleQuestion, NumberQuestion, TextQuestion } from "src/app/shared/models/question.model";
import { BeerService } from "../beer.service";
import { AppState } from "../store/app.reducer";

import * as CreatorActions from "./store/creator.actions";

interface CreatorData {
  required: boolean;
  question: string;
  answer: TextQuestion | NumberQuestion | MultipleQuestion;
  type: string;
}

type questionTypes = TextQuestion | NumberQuestion | MultipleQuestion;

@Component({
    selector: "app-form-creator",
    templateUrl: "./form-creator.component.html",
    styleUrls: ["./form-creator.component.scss"],
    standalone: false
})
export class FormCreatorComponent implements OnInit {
  @Input("index") index = 0;
  formName: string = "";
  questions: Question[] = [];
  touched: boolean = false;
  finishedInfo = { url: "", id: "", accessCode: ''};
  ready = false;

  formGroup: UntypedFormGroup;

  constructor(private store: Store<AppState>, private beer: BeerService, private router: Router) {}

  ngOnInit(): void {}

  //store info that form is changed and so the user will be warned when trying to leave the page
  onTouch() {
    if (!this.touched) {
      this.touched = true;
      this.store.dispatch(CreatorActions.changes());
    }
  }

  onTypeChange() {
    for (let question of this.questions) {
      if (question.answerType == "") {
        this.ready = false;
        return;
      }
    }
    this.ready = true;
  }

  onQuestionChange(event: questionTypes, index: number) {
    this.onTouch();
    this.questions[index].type = event;
    console.log(this.questions);
    
  }

  //send the form to db
  submitForm() {
    console.log(this.questions);
    
    this.store.dispatch(
      CreatorActions.uploadStart({
        questions: this.questions.slice(),
        name: this.formName,
      })
    );
    this.store.select("creator").subscribe((state) => {
      if (state.url !== "" && state.done === true && !state.changes) {
        //display finish modal
        this.finishedInfo = {
          id: state.url,
          url: `${window.origin}/${state.url}`,
          accessCode: state.accessCode
        };

        this.beer.modal.next({type: 'created', content: {
          url: `${window.origin}/${state.url}`,
          id: state.url,
          accessCode: state.accessCode,
        }});
      }
    });
  }


  deleteForm(id: number) {
    this.questions.splice(id, 1);
    this.onTypeChange();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addMore() {
    this.questions.push(new Question());
    //delayed window scroll so the new question will be visible
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
    this.onTypeChange();
  }
}
