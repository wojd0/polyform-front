import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import Question, { MultipleQuestion } from "src/app/shared/models/question.model";

@Component({
  selector: "app-multiple",
  templateUrl: "./multiple.component.html",
  styleUrls: ["./multiple.component.scss"],
})
export class MultipleAnswerComponent implements OnInit {
  @Input("question") question = new Question();
  @Input("form") form: UntypedFormGroup;

  controlName = "";

  options: MultipleQuestion;

  lastChanged = "";
  lastValues: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    this.options = <MultipleQuestion> this.question.type;
    this.controlName = this.question.options.index + "q";
  }
}
