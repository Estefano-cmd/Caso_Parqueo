export interface Subscriber {
  id: number;
  email: string;
  direction: string;
  phone: number;
  enabled: boolean;
  clientId: number;
}

export type SubscriberDTO = Omit<Subscriber, 'id'>;
