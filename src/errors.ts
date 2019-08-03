import { AjaxError } from 'rxjs/ajax';
import Http from 'http-status-codes';

export const BAD_REQUEST = 'BAD_REQUEST';
export const PAYMENT_REQUIRED = 'PAYMENT_REQUIRED';
export const NOT_FOUND = 'NOT_FOUND';
export const CONFLICT = 'CONFLICT';
export const INTERNAL_RAIDEN_NODE_ERROR = 'INTERNAL_RAIDEN_NODE_ERROR';
export const NOT_IMPLEMENTED = 'NOT_IMPLEMENTED';

export type ErrorType =
  | typeof BAD_REQUEST
  | typeof PAYMENT_REQUIRED
  | typeof NOT_FOUND
  | typeof CONFLICT
  | typeof INTERNAL_RAIDEN_NODE_ERROR
  | typeof NOT_IMPLEMENTED;

export class RaidenAPIError extends Error {
  public type: ErrorType;

  public errors: { [key: string]: string[] } | string;

  public cause: AjaxError;

  constructor(err: AjaxError) {
    const errors = err.response.errors as string | string[];
    super(Array.isArray(errors) ? errors[0] : errors);
    Error.captureStackTrace(this, RaidenAPIError);
    this.name = RaidenAPIError.name;

    this.cause = err;
    this.errors = err.response.errors;

    switch (err.status) {
      case Http.BAD_REQUEST:
        this.type = BAD_REQUEST;
        break;
      case Http.PAYMENT_REQUIRED:
        this.type = PAYMENT_REQUIRED;
        break;
      case Http.NOT_FOUND:
        this.type = NOT_FOUND;
        break;
      case Http.CONFLICT:
        this.type = CONFLICT;
        break;
      case Http.NOT_IMPLEMENTED:
        this.type = NOT_IMPLEMENTED;
        break;
      default:
        this.type = INTERNAL_RAIDEN_NODE_ERROR;
        break;
    }
  }
}
