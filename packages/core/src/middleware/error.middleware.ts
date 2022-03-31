import {
  NextFunction, Request, Response,
} from 'express';
import { ApiException } from '../exception';

function errorMiddleware(error: ApiException, _req: Request, res: Response, _next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Error processing request.';
  res
    .status(status)
    .send({
      ...error,
      message,
      status,
    });
}

export default errorMiddleware;
