import { Client } from './../types/Client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(`${environment.endpoints}/client`);
  }

  getOne(id: number): Observable<Client> {
    return this.http.get<Client>(`${environment.endpoints}/client/${id}`);
  }

  create(data: Client): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/client`, data);
  }

  update(id: number, data: Partial<Client>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/client/${id}`, data);
  }

  delete(id: number): Observable<Array<Client>> {
    return this.http.delete<Array<Client>>(`${environment.endpoints}/client/${id}`);
  }
}
