import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MultipleQuestion, MultipleQuestionOptions } from "src/app/shared/models/question.model";

@Component({
  selector: "creator-multiple",
  templateUrl: "./creator-multiple.component.html",
})
export class MultipleCreatorComponent implements AfterViewInit, MultipleQuestionOptions {
  limit = 1;
  answers: string[] = [];
  newQuestion = "";
  max: number;
  
  @Output("changed") changed = new EventEmitter<MultipleQuestionOptions>();
  @ViewChild("form") form!: NgForm;

  ngAfterViewInit(): void {
    this.form.valueChanges?.subscribe(() => {    
      this.changed.emit(Object.assign(new Object(), this``) as MultipleQuestionOptions);
    });
  }

  add() {
    this.answers.push(this.newQuestion);
    this.newQuestion = "";
  }

  remove(index: number) {    
    this.answers.splice(index, 1);
  }
}
