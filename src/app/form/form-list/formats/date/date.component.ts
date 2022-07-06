import { Component, Input, OnInit } from '@angular/core';
import Question, { DateQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateAnswerComponent implements OnInit {
  @Input('question') question = new Question<DateQuestion>();

  constructor() { }

  ngOnInit(): void {
  }

}
