import ApiException from './ApiException';

class CompileError extends ApiException {
  public filePath: string;

  constructor(message: string, filePath: string) {
    super(400, message);
    Object.setPrototypeOf(this, CompileError.prototype);
    this.filePath = filePath;
  }
}

export default CompileError;
