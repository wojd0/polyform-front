import { Component, Input, OnInit } from '@angular/core';
import Question, { TextQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextAnswerComponent implements OnInit {
  @Input('question') question = new Question;

  options: TextQuestion = new TextQuestion;
  min = 0;
  max = 0;

  constructor() { }

  ngOnInit(): void {
    this.options = <TextQuestion> this.question.type;
    this.min = this.options.minWords;
    this.max = this.options.maxWords;
  }

}
