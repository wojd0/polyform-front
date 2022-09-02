import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MultipleQuestion } from "src/app/shared/models/question.model";

@Component({
  selector: "creator-multiple",
  templateUrl: "./creator-multiple.component.html",
})
export class MultipleCreatorComponent implements AfterViewInit {
  options = [];
  newQuestion = "";
  max: number;
  @Output("changed") changed = new EventEmitter<MultipleQuestion>();
  @ViewChild("form") form!: NgForm;

  constructor() {}

  ngAfterViewInit(): void {
    this.form.valueChanges?.subscribe(changes => {      
      //emit new values
      this.changed.emit(
        {
          answers: [...this.options],
          limit: this.max,
        }
      );
    });
  }

  add() {
    this.options.push(this.newQuestion);
    this.newQuestion = "";
  }

  remove(value: string) {
    this.options.splice(this.options.indexOf(value), 1);
  }
}
