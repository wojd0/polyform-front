import Question from "./question.model";

interface Options {
  [key: string]: any;
  name: string;
}

export class FormModel {
  createdAt: string;
  updatedAt: string;
  constructor(public id: string, public user: string, public url: string, public options: Options) {}
}
