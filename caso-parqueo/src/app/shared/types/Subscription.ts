export interface Subscription {
  id: number;
  dateBegin: Date;
  dateFinish: Date;
  subscriberId: number;
  subscriberTypeId: number;
}

export type SubscriptionDTO = Omit<Subscription, 'id'>;
