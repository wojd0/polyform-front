import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Question, { MultipleQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleAnswerComponent implements OnInit {
  @Input('question') question = new Question;
  @Input('form') form: FormGroup;
  
  controlName = '';

  options: MultipleQuestion;
  type: 'radio' | 'checkbox' = 'checkbox';
  constructor() { }

  ngOnInit(): void {
    this.options = <MultipleQuestion> this.question.type;
    this.controlName = this.question.options.index + 'q';
    this.type  = this.options.limit === 1 ? 'radio' : 'checkbox';
  }
}
