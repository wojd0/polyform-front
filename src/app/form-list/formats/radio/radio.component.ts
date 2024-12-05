import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import Question, { MultipleQuestion } from 'src/app/shared/models/question.model';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    standalone: false
})
export class RadioAnswerComponent implements OnInit {
  @Input("question") question = new Question();
  @Input("form") form: UntypedFormGroup;

  controlName = "";

  options: MultipleQuestion;
  type: "radio" | "checkbox" = "checkbox";

  lastChanged = "";
  lastValues: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    this.options = <MultipleQuestion> this.question.type;
    this.controlName = this.question.options.index + "q";
    this.type = this.options.limit === 1 ? "radio" : "checkbox";
  }
}
