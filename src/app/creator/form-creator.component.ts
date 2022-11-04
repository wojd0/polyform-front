import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import Question, { MultipleQuestion, NumberQuestion, QuestionTypesMap, TextQuestion } from "src/app/shared/models/question.model";
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
  @Input("index") index = 0;
  formName: string = "";
  questions: Question<any, any>[] = [];
  touched: boolean = false;
  finishedInfo = { url: "", id: "", accessCode: ''};
  types: string[] = [];
  haveQueries: boolean[] = []

  formGroup: FormGroup;

  constructor(private store: Store<AppState>, private beer: BeerService, private router: Router) {}

  ngOnInit(): void {}


  //store info that form is changed and so the user will be warned when trying to leave the page
  onTouch(val?: any) {
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
        questions: this.questions.slice().map((question, index) => {
          return ({...question, type: this.types[index]})
        }),
        name: this.formName,
      })
    );
        
    this.store.select("creator").subscribe((state) => {
      if (state.url !== "" && state.done === true && !state.changes) {
        //display finish modal
        this.finishedInfo = {
          id: state.url,
          url: `website.com/${state.url}`,
          accessCode: state.accessCode
        };

        this.beer.modal.next({type: 'created', content: {
          url: `https://website.com/${state.url}`,
          id: state.url,
          accessCode: state.accessCode,
        }});
      }
    });
  }


  deleteForm(id: number) {
    this.questions.splice(id, 1);
    this.types.splice(id, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  onTypeChange(index: number, type: string){
    this.types[index] = type;
  }

  addMore() {
    const newQuestion = new Question();
    newQuestion.index = this.questions.length;
    newQuestion.required = false;
    this.questions.push(newQuestion);
    this.haveQueries.push(false);
    this.types.push('text');
    
    //delayed window scroll so the new question will be visible
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  }
}
