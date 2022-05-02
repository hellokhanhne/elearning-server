import { RoleEntity } from 'src/entity/Role.entity';

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: RoleEntity;
}

export interface ResLoginSuccess extends Tokens {
  user: IUser;
}
