import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Question, { NumberQuestionOptions } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberAnswerComponent implements OnInit {
  @Input('question') question: Question<NumberQuestionOptions, number>;
  @Input('form') form: FormGroup;
  
  options: NumberQuestionOptions;
  min = 0;
  max = 0;
  prefix = '';
  suffix = '';
  precision = 2;

  controlName = '';

  constructor() { }

  ngOnInit(): void {
    this.options =  this.question.details;
    this.min = this.options.min;
    this.max = this.options.max;
    this.prefix = this.options.prefix;
    this.suffix = this.options.suffix;
    this.precision = this.options.precision;

    this.controlName = this.question.index + 'q'
  }
}
