export interface User {
  _id?: string;
  name: string;
  lastName: string;
  age: number;
  description: string;
  email: string;
  password: string;
  createdAt?: Date;
}
