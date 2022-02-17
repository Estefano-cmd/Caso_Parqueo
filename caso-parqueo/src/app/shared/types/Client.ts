export interface Client {
  id: number;
  name: string;
  surnames: string;
  age: number;
  phone: number;
  email: string|null;
  createdAt: Date;
  updatedAt: Date;
}
