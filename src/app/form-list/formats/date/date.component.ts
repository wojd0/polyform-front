import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import Question, { DateQuestion } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateAnswerComponent implements OnInit {
  @Input('question') question = new Question();
  @Input('form') form: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
