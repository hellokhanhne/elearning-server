import { HttpStatus } from '@nestjs/common';

export interface IErrorMsg {
  error: string;
  status: HttpStatus;
}
