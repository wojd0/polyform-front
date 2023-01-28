import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import Question, { MultipleQuestion, NumberQuestion, questionTypes, QuestionTypesMap, TextQuestion } from "src/app/shared/models/question.model";
import { BeerService } from "../beer.service";
import { AppState } from "../store/app.reducer";

import * as CreatorActions from "./store/creator.actions";

interface CreatorData {
  required: boolean;
  question: string;
  answer: TextQuestion | NumberQuestion | MultipleQuestion;
  type: string;
}

@Component({
  selector: "app-form-creator",
  templateUrl: "./form-creator.component.html",
  styleUrls: ["./form-creator.component.scss"],
})
export class FormCreatorComponent implements OnInit {
  formName: string = "";
  questions: Question<any, any>[] = [];
  touched: boolean = false;
  finishedInfo = { url: "", id: "", accessCode: ''};

  questionTypes = questionTypes;

  constructor(private store: Store<AppState>, private beer: BeerService, private router: Router) {}

  ngOnInit(): void {}


  //store info that form is changed and so the user will be warned when trying to leave the page
  onTouch() {
    if (!this.touched) {
      this.touched = true;
      this.store.dispatch(CreatorActions.changes());
    }
    
  }

  onQuestionChange(event: any, index: number) {   
    this.onTouch();
    this.questions[index].details = event;
  }

  //send the form to db
  submitForm() {
    this.store.dispatch(
      CreatorActions.uploadStart({
        questions: this.questions,
        name: this.formName
      })
    );
        
    this.store.select("creator").subscribe((state) => {
      if (state.url !== "" && state.done === true && !state.changes) {
        //display finish modal
        this.finishedInfo = {
          id: state.id,
          url: state.url,
          accessCode: state.accessCode
        };

        this.beer.modal.next({type: 'created', content: {
          url: state.url,
          id: state.id,
          accessCode: state.accessCode,
        }});
      }
    });
  }

  deleteForm(id: number) {
    this.questions.splice(id, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  changeType(index: number, type: string){
    
    const newQuestion = QuestionTypesMap(type);
    
    newQuestion.query = this.questions[index].query;
    this.questions[index] = newQuestion;
    
  }

  addMore() {    
    const newQuestion = new TextQuestion();
    newQuestion.required = false;
    this.questions = [...this.questions, newQuestion];
    
    //delayed window scroll so the new question will be visible
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  }
}
