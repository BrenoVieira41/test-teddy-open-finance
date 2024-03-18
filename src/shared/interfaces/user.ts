import { Request } from 'express';

export interface IUserRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string
  };
}

export interface IUser {
  id: string;
  email: string;
  name: string
}
