import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/form.service';
import { MultipleQuestion, NumberQuestion, TextQuestion } from 'src/app/shared/question.model';

interface CreatorData {
  required: boolean;
  question: string;
  answer: TextQuestion | NumberQuestion | MultipleQuestion;
  type: string;
}

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {
  @Input('index') index = 0;
  formName: string = '';
  questions: CreatorData[] = [{question: '', required: false, answer: new TextQuestion, type: 'text'}];

  constructor(private formService: FormService) { }

  onChange(event: TextQuestion | NumberQuestion | MultipleQuestion, index: number){
    this.questions[index].answer = event;    
  }

  putForm(){
    
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
    this.questions.push({question: '', required: false, answer: new TextQuestion, type: 'text'});
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    
  }
}
