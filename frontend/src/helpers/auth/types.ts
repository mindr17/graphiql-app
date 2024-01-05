export interface ApiUser {
  id: string;
  email: string;
  password_hash: string;
}

export interface UserTemplate {
  email: string;
  password: string;
}
