class ApiException extends Error {
  public status: number;

  public message: string;

  constructor(status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, ApiException.prototype);
    this.status = status;
    this.message = message;
  }
}

export default ApiException;
