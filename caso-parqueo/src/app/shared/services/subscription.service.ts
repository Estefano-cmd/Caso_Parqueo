import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subscription, SubscriptionDTO } from '../types/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Subscription>> {
    return this.http.get<Array<Subscription>>(`${environment.endpoints}/subscription`);
  }

  getOne(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${environment.endpoints}/subscription/${id}`);
  }

  create(data: SubscriptionDTO): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/subscription`, data);
  }

  update(id: number, data: Partial<SubscriptionDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/subscription/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/subscription/${id}`);
  }

}
