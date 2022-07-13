import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import Question, { MultipleQuestion, NumberQuestion, TextQuestion } from "src/app/shared/question.model";
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
})
export class FormCreatorComponent implements OnInit {
  @Input("index") index = 0;
  formName: string = "";
  questions: Question[] = [];
  touched: boolean = false;
  finishedInfo = { url: "", id: "" };

  formGroup: FormGroup;

  constructor(private store: Store<AppState>, private beer: BeerService) {}

  ngOnInit(): void {}

  onTouch() {
    if (!this.touched) {
      this.touched = true;
      this.store.dispatch(CreatorActions.changes());
    }
  }

  onQuestionChange(event: questionTypes, index: number) {
    this.onTouch();
    this.questions[index].type = event;
  }

  submitForm() {
    console.log(this.questions);
    
    this.store.dispatch(CreatorActions.uploadStart({ questions: this.questions.slice(), name: this.formName }));
    this.store.select("creator").subscribe((state) => {
      if (state.url !== "" && state.done === true) {
        this.finishedInfo = {
          id: state.url,
          url: `website.com/${state.url}`,
        };

        this.beer.beerIt("#finishModal");

        //remove event listener from modal, so losing focus wont hide it
        document
          .querySelector("body > app-root > app-form-creator > div.overlay.active")
          .replaceWith(document.querySelector("body > app-root > app-form-creator > div.overlay.active").cloneNode(true));
      }
    });
  }

  deleteForm(id: number) {
    this.questions.splice(id, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addMore() {
    this.questions.push(new Question(new TextQuestion()));
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }
}
