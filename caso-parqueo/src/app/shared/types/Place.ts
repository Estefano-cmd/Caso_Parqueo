export interface Place {
  id: number;
  name: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PlaceDTO = Omit<Place, 'id'>;
