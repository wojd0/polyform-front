import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import Question, { TextQuestionOptions } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextAnswerComponent implements OnInit {
  @Input('question') question: Question<TextQuestionOptions, string>;
  @Input('form') form: FormGroup;
  options: TextQuestionOptions;
  min = 0;
  max = 10;
  controlName = '';

  constructor() { }

  ngOnInit(): void {
    this.options = this.question.details;
    this.min = this.options.minWords;
    this.max = this.options.maxWords;

    this.controlName = this.question.index + 'q';
    

    if(this.question.required) this.form.addValidators(Validators.required);
  }
}
