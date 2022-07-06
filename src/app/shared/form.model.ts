import Question from "./question.model";

export interface FormModel{
  id: string;
  name: string,
  userId: string;
  url: string;
  flags: object;
  experimental: boolean;
}


export class Form implements FormModel{
  experimental = false;
  flags = {};
  id = '';
  name = '';
  url = '';
  userId = '';
  questions: Question<any>[] = [];
  constructor(
    private data: Partial<FormModel>, private state: 'new' | 'existing' = 'existing', questions: Question<any>[] | null
  ){
    Object.assign(this, data);
    if(state == "new" && questions && questions.length > 0){
      this.questions = questions;
    }
  }
}