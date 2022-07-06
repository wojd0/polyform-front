import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/shared/form.model';
import { FormService } from 'src/app/shared/form.service';
import Question, { TextQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  form: Form;
  
  constructor(private formService: FormService) {
    this.form = this.formService.getForm(0);
  }

  ngOnInit(): void {
  }

}
