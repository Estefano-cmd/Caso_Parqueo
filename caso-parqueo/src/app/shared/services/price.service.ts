import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from './../types/Price';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Price>> {
    return this.http.get<Array<Price>>(`${environment.endpoints}/price`);
  }

  getOne(id: number): Observable<Price> {
    return this.http.get<Price>(`${environment.endpoints}/price/${id}`);
  }

  create(data: Price): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/price`, data);
  }

  update(id: number, data: Partial<Price>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/price/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/price/${id}`);
  }
}
