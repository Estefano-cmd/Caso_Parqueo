export interface Client {
  id: number;
  name: string;
  surnames: string;
}

export type ClientDTO = Omit<Client, 'id'>;
