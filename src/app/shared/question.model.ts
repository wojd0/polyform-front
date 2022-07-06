export default class Question {
  answerType: string;
  constructor(
    public type: TextQuestion | DateQuestion | NumberQuestion | MultipleQuestion | FileQuestion = new TextQuestion,
    public query: string = '',
    public id: string = '',
    public user: string = 'anon',
    public options: QuestionOptions = new QuestionOptions(),
  ) {
    this.answerType = this.type.constructor.name;
  }

}

export class QuestionOptions{
  required: boolean = false;
  langQ: string = 'en';
  langA: string = 'en';
  constructor(options?: Partial<QuestionOptions>){
    Object.assign(this, options);
  }
}

export class TextQuestion {
  minWords: number = 0;
  maxWords: number = 40;
  constructor(options?: Partial<TextQuestion>){
    Object.assign(this, options);
  }
}

export class DateQuestion {
  displayFormat: "short" | "locale" | "full" = 'full';
  constructor(options?: Partial<DateQuestion>){
    Object.assign(this, options);
  }
}

export class NumberQuestion {
  prefix: string = '';
  suffix: string = ''; 
  min: number = 0; 
  max: number = 100;
  precision: number = 2;
  constructor(options?: Partial<NumberQuestion>){
    Object.assign(this, options)
  }
}

export class MultipleQuestion {
  answers: Array<{answer: string, name: string}> = [];
  limit: number = 0;
  constructor(options?: Partial<MultipleQuestion>){
    Object.assign(this, options)
  }
}

export class FileQuestion {}
