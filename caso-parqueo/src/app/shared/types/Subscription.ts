export interface Subscription {
  id: number;
  dateBegin: Date;
  dateFinish: Date;
  subscriberId: number;
  subscriptionTypeId: number;
}

export type SubscriptionDTO = Omit<Subscription, 'id'>;
