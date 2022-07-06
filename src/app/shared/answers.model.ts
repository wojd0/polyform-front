export default class Answer {
  constructor(
    public questionId: string,
    public answer: string | number | Date | string[],
    public user: string | null = null,
    public date = new Date,
  ) {
  }

}
