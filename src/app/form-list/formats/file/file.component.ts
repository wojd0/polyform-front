import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import Question, { FileQuestion } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileAnswerComponent implements OnInit {
  @Input('question') question = new Question();
  @Input('form') form: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
