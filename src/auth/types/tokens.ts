export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface ResLoginSuccess extends Tokens {
  user: Object;
}
