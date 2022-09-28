import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import QuestionModel from 'src/app/shared/models/question.model';
import Question, { TextQuestion } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextAnswerComponent implements OnInit {
  @Input('question') question: QuestionModel;
  @Input('form') form: FormGroup;
  options: TextQuestion;
  min = 0;
  max = 10;
  controlName = '';

  constructor() { }

  ngOnInit(): void {
    this.options = <TextQuestion> this.question.type;
    this.min = this.options.minWords;
    this.max = this.options.maxWords;    

    this.controlName = this.question.options.index + 'q';
    

    if(this.question.options.required) this.form.addValidators(Validators.required);
  }
}
