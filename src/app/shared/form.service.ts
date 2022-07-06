import { Injectable } from "@angular/core";
import { Form } from "./form.model";
import Question, { DateQuestion, MultipleQuestion, NumberQuestion, TextQuestion } from "./question.model";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private fakeForm = [
    new Form({name: 'test'}, 'new', [
      new Question('What is your favorite dish?', new TextQuestion({minWords: 4})),
      new Question('When was the last time you had it?', new DateQuestion()),
      new Question('test', new NumberQuestion({max: 4})),
      
    ])
  ];

  getForm(id: number): Form {
    return this.fakeForm.slice()[0];
  }

  remForm(id: number) {
    this.fakeForm.splice(id, 1)
  }

  newForm(form: Form) {
    this.fakeForm.push();
  }
}
