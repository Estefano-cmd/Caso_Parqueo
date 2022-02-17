export interface Register {
  id: number;
  dateEntry: Date;
  dateExit: Date;
  place: string;
  total: number;
  enabled: true;
  priceId: number;
  clientId: number;
  employeId: number;
}

export type RegisterDTO = Omit<Register, 'id'>;
