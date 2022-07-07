import Question from "./question.model";

export class FormModel{
  constructor(public id: string, public user: string, public url: string, public options: {[key: string]: any}){}
}