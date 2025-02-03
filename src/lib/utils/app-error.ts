export default class AppError {
  protected message: string | ValidationError[] = "";

  constructor(message: string | ValidationError[]) {
    this.message = message;
  }
}