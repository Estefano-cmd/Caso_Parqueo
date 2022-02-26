export interface Register {
  id: number;
  dateEntry: Date;
  dateExit: Date;
  placeId: number;
  total: number;
  enabled: boolean;
  priceId: number;
  clientId: number;
  employeId: number;
}

export type RegisterDTO = Omit<Register, 'id'>;
