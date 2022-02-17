import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionType } from '../types/SubscriptionType';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<SubscriptionType>> {
    return this.http.get<Array<SubscriptionType>>(`${environment.endpoints}/subscriptionType`);
  }

  getOne(id: number): Observable<SubscriptionType> {
    return this.http.get<SubscriptionType>(`${environment.endpoints}/subscriptionType/${id}`);
  }
}
