import { Component, Input, OnInit } from '@angular/core';
import Question, { NumberQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberAnswerComponent implements OnInit {
  @Input('question') question= new Question;

  options: NumberQuestion = new NumberQuestion;
  min = 0;
  max = 0;
  prefix = '';
  suffix = '';
  precision = 2;

  constructor() { }

  ngOnInit(): void {
    this.options =  <NumberQuestion> this.question.format;
    this.min = this.options.min;
    this.max = this.options.max;
    this.prefix = this.options.prefix;
    this.suffix = this.options.suffix;
    this.precision = this.options.precision;
  }
  //TODO: add prefix and suffix when returning values
}
