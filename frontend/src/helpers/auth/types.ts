export interface UserTemplate {
  email: string;
  password: string;
}

export interface UserToBeWritten {
  email: string;
  password_hash: string;
}

export interface ApiUser {
  id: string;
  email: string;
  password_hash: string;
}
