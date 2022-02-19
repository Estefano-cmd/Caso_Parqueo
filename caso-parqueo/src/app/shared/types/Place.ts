export interface Place {
  id: number;
  fullname: string;
  state: boolean;
}

export type PlaceDTO = Omit<Place, 'id'>;
