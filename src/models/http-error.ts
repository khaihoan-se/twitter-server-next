
class HttpError extends Error {
    message: string;
    errorCode: number;
    constructor(message: string, errorCode: number) {
      super(message);
      this.errorCode = errorCode;
    }
  }
  
export default HttpError