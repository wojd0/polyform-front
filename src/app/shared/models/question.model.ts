export default class QuestionModel {
  [x: string]: any;
  constructor(
    public type: TextQuestion & DateQuestion & NumberQuestion & MultipleQuestion & FileQuestion = {},
    public query: string = '',
    public id: string = '',
    public options: QuestionOptions = {},
    public answerType: string = ''
  ) {
  }
}

export interface QuestionOptions{
  index?: number;
  required?: boolean;
}

export interface TextQuestion {
  minWords?: number;
  maxWords?: number;
}

export interface DateQuestion {
  displayFormat?: string;
}

export interface NumberQuestion {
  prefix?: string;
  suffix?: string; 
  min?: number; 
  max?: number;
  precision?: number;
}

export interface MultipleQuestion {
  answers?: Array<string>;
  limit?: number;
}

export class FileQuestion {}
