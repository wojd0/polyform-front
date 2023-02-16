import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import Question, { MultipleQuestionOptions } from "src/app/shared/models/question.model";

@Component({
  selector: "app-multiple",
  templateUrl: "./multiple.component.html",
  styleUrls: ["./multiple.component.scss"],
})
export class MultipleAnswerComponent implements OnInit {
  @Input("question") question: Question<MultipleQuestionOptions, string[]>;
  @Input("form") form: FormGroup;

  controlName = "";

  options: MultipleQuestionOptions;

  lastChanged = "";
  lastValues: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    this.options = this.question.details;
    this.controlName = this.question.index + "q";
  }
}
