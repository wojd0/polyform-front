import { Component, OnInit } from '@angular/core';
import { FormModel } from 'src/app/shared/form.model';
import QuestionModel from 'src/app/shared/question.model';
import Question, { TextQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  form: FormModel;
  questions: QuestionModel[] = [];
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
