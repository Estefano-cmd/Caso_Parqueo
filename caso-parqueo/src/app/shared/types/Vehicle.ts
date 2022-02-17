export interface Vehicle {
  licensePlate: string;
  color: string;
  model: string;
  marca: string;
  clientId: number;
}

export type VehicleDTO = Omit<Vehicle, 'id'>;
