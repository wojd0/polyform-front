import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import Question, { MultipleQuestion, NumberQuestion, TextQuestion } from 'src/app/shared/question.model';
import { AppState } from '../store/app.reducer';

import * as CreatorActions from './store/creator.actions';

interface CreatorData {
  required: boolean;
  question: string;
  answer: TextQuestion | NumberQuestion | MultipleQuestion;
  type: string;
}

type questionTypes = TextQuestion | NumberQuestion | MultipleQuestion;

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {
  @Input('index') index = 0;
  formName: string = '';
  questions: Question[] = [];
  touched: boolean = false;

  constructor(private store: Store<AppState>) { }

  onTouch(){
    if(!this.touched){
      this.touched = true;
      this.store.dispatch(CreatorActions.changes());
      console.log('click');
      
    }
  }

  onQuestionChange(event: questionTypes, index: number){
    this.onTouch();
    this.questions[index].type = event; 
  }

  submitForm(){
    this.store.dispatch(CreatorActions.uploadStart({questions: this.questions.slice()}));
  }

  ngOnInit(): void {
  }

  deleteForm(id: number){
    this.questions.splice(id, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addMore(){
    this.questions.push(new Question(new TextQuestion()));
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    
  }
}
