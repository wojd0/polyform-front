import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { MultipleQuestionOptions } from "src/app/shared/models/question.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "creator-multiple",
  templateUrl: "./creator-multiple.component.html",
})
export class MultipleCreatorComponent implements AfterViewInit, OnDestroy, MultipleQuestionOptions {
  limits = environment.limitations.multiple


  limit = 1;
  answers: string[] = [];
  newQuestion = "";
  max: number = 0;
  dv

  @Input('form') globalForm: NgForm;
  @Output("changed") changed = new EventEmitter<MultipleQuestionOptions>();
  @ViewChild('dummy') dummy: NgModel;
  @ViewChild('newAnswer') newAns: NgModel;

  ngAfterViewInit(): void {
    this.newAns.valueChanges?.subscribe(() => {
      this.emitChanges()
    });
    this.globalForm.addControl(this.dummy);
  }

  ngOnDestroy(): void {
    this.globalForm.removeControl(this.dummy);
  }

  add() {
    this.answers.push(this.newQuestion);
    this.newQuestion = "";
    this.emitChanges();
  }

  remove(index: number) {    
    this.answers.splice(index, 1);
    this.emitChanges();
  }


  emitChanges(){
    this.dummy.reset('');
    this.changed.emit({
      answers: this.answers, limit: this.limit
    })
  }
}
