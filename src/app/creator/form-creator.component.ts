import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormService } from 'src/app/shared/form.service';
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

  constructor(private formService: FormService, private store: Store<AppState>) { }

  onChange(event: questionTypes, index: number){
    this.questions[index].type = event;    
  }

  submitForm(){
    console.log(this.questions);
    this.store.dispatch(CreatorActions.upload({questions: this.questions.slice()}));
  }

  ngOnInit(): void {
    this.store.select('creator').subscribe(data => {
      console.log('The response: ' + data.url);
      console.log('The error: ' + data.errorMsg);
    })
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
