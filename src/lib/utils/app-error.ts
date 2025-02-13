export default class AppError {
  protected message: string = "";

  constructor(message: string) {
    this.message = message;
  }
}