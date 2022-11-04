import Question from "./question.model";

export interface Results {
  formName: string;
  options?: {[key:string]: any};
  submissions: Submission[];
  questions: Question<any, any>[];
}

export interface Submission{
  submitDate: Date;
  answers: (string[] | string | number | Date)[];
}
