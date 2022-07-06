export default class Question<T> {
  answerType: string;
  constructor(
    public query: string | null = "",
    public format: TextQuestion | DateQuestion | NumberQuestion | MultipleQuestion | FileQuestion = new TextQuestion,
    public id: string = '',
    public user: string | null = null,
    public options: QuestionOptions | null = new QuestionOptions(),
  ) {
    this.answerType = this.format.constructor.name;
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
