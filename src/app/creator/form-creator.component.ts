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
  ready = false;

  formGroup: FormGroup;

  constructor(private store: Store<AppState>, private beer: BeerService) {}

  ngOnInit(): void {}

  //store info that form is changed and so the user will be warned when trying to leave the page
  onTouch() {
    if (!this.touched) {
      this.touched = true;
      this.store.dispatch(CreatorActions.changes());
    }
  }

  onTypeChange(){
    for(let question of this.questions){
      console.log(question.answerType);
      
      if(question.answerType == ''){
        this.ready = false;
        return;
      }
    }
    this.ready = true;
  }

  onQuestionChange(event: questionTypes, index: number) {
    this.onTouch();
    this.questions[index].type = event;
  }

  //send the form to db
  submitForm() {    
    this.store.dispatch(CreatorActions.uploadStart({ questions: this.questions.slice(), name: this.formName }));
    this.store.select("creator").subscribe((state) => {
      if (state.url !== "" && state.done === true && !state.changes) {
        //display finish modal
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
