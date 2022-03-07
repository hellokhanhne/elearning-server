import { Request } from 'express';

export interface RequestDto extends Request {
  user: {
    email: string;
    id: number;
    role: number;
  };
}
