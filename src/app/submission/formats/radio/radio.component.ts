import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Question, { MultipleQuestion, MultipleQuestionOptions } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioAnswerComponent implements OnInit {
  @Input("question") question: Question<MultipleQuestionOptions, string[]>;
  @Input("form") form: FormGroup;

  controlName = "";

  options: MultipleQuestionOptions;
  type: "radio" | "checkbox" = "checkbox";

  lastChanged = "";
  lastValues: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    this.options = this.question.details;
    this.controlName = this.question.index + "q";
    this.type = this.options.limit === 1 ? "radio" : "checkbox";
  }
}
