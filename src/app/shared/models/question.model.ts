export const questionTypes: {name: string, value: string, enabled: boolean}[] = [
    {
      name: 'Text Question',
      value: 'text',
      enabled: true
    },
    {
      name: 'Number Question',
      value: 'number',
      enabled: true
    },
    {
      name: 'Multiple Question',
      value: 'multiple',
      enabled: true
    },
    {
      name: 'Date Question',
      value: 'date',
      enabled: true
    },
    {
      name: 'File Question',
      value: 'file',
      enabled: false
    }
]

export interface QuestionOptions {
  id?: string;
  formId?: string;
  index?: number;
  query?: string;
  url?: string;
  required?: boolean;
  details?: any;
}


export default class Question<
  questionType extends MultipleQuestionOptions | TextQuestionOptions | DateQuestionOptions | NumberQuestionOptions | FileQuestionOptions,
  answerType
> implements QuestionOptions
{
  id?: string;
  index?: number;
  formId?: string;
  query?: string;
  url?: string;
  required?: boolean;
  details?: questionType;
  type?: string;
  validateQuestion: () => boolean;
}
export interface TextQuestionOptions {
  minWords: number;
  maxWords: number;
}

export class TextQuestion extends Question<TextQuestionOptions, string> {
  override readonly type = "text";
  override details: TextQuestionOptions = { minWords: 0, maxWords: 100 };

  constructor(options?: QuestionOptions & TextQuestionOptions) {
    super();
    Object.assign(this, options);
  }
}

export interface NumberQuestionOptions {
  prefix: string;
  suffix: string;
  min: number;
  max: number;
  precision: number;
}

export class NumberQuestion extends Question<NumberQuestionOptions, number> {
  override readonly type = "number";
  override details: NumberQuestionOptions = {
    prefix: "",
    suffix: "",
    min: 0,
    max: 100,
    precision: 2,
  };
  constructor(options?: QuestionOptions & NumberQuestionOptions) {
    super();
    Object.assign(this, options);
  }
}

type DateDisplayFormats = "full" | "short";
export interface DateQuestionOptions {
  displayFormat: DateDisplayFormats;
  showTime: boolean;
  locale: boolean;
  min?: Date;
  max?: Date;
}

export class DateQuestion extends Question<DateQuestionOptions, Date> {
  override details: DateQuestionOptions = {
    showTime: true,
    locale: true,
    displayFormat: "full",
  };

  override readonly type = "date";

  constructor(options?: QuestionOptions & DateQuestionOptions) {
    super();
    Object.assign(this, options);
  }
}

export interface MultipleQuestionOptions {
  answers: string[];
  limit: number;
}

export class MultipleQuestion extends Question<MultipleQuestionOptions, string[]> {
  override details?: MultipleQuestionOptions = {
    answers: [],
    limit: 0,
  };

  override readonly type = "multiple";

  constructor(options?: QuestionOptions & MultipleQuestionOptions) {
    super();
    Object.assign(this, options);
  }
}

export interface FileQuestionOptions {}

export class FileQuestion extends Question<null, null> {}

export const QuestionTypesMap = (type: string) => {
  switch(type){
    case 'text':
      return new TextQuestion()
    case 'date':
      return new DateQuestion()
    case 'number':
      return new NumberQuestion()
    case 'file':
      return new FileQuestion()
    case 'multiple':
      return new MultipleQuestion()
    default:
      return new Question<unknown, unknown>()
  }
}