import { Component, Input, OnInit } from '@angular/core';
import Question, { FileQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileAnswerComponent implements OnInit {
  @Input('question') question = new Question();

  constructor() { }

  ngOnInit(): void {
  }

}
