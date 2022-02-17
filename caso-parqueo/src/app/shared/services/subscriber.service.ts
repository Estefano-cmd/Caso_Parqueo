import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subscriber, SubscriberDTO } from '../types/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Subscriber>> {
    return this.http.get<Array<Subscriber>>(`${environment.endpoints}/subscriber`);
  }

  getOne(id: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${environment.endpoints}/subscriber/${id}`);
  }

  create(data: SubscriberDTO): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/subscriber`, data);
  }

  update(id: number, data: Partial<SubscriberDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/subscriber/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/subscriber/${id}`);
  }

}
