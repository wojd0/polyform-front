import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Question, { NumberQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberAnswerComponent implements OnInit {
  @Input('question') question= new Question;
  @Input('form') form: FormGroup;
  
  options: NumberQuestion = new NumberQuestion;
  min = 0;
  max = 0;
  prefix = '';
  suffix = '';
  precision = 2;

  controlName = '';

  constructor() { }

  ngOnInit(): void {
    this.options =  <NumberQuestion> this.question.type;
    this.min = this.options.min;
    this.max = this.options.max;
    this.prefix = this.options.prefix;
    this.suffix = this.options.suffix;
    this.precision = this.options.precision;

    this.controlName = this.question.options.index + 'q'
  }
}
