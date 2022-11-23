import Question from "./question.model";

export interface Results {
  formName: string;
  submissions: Submission[];
  questions: Question<any, any>[];
}

export interface Submission{
  submitDate: Date;
  answers: string[];
}
