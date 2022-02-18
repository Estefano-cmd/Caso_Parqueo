import { Client, ClientDTO } from './../types/Client';
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

  create(data: ClientDTO): Observable<Client> {
    return this.http.post<Client>(`${environment.endpoints}/client`, data);
  }

  update(id: number, data: Partial<ClientDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/client/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/client/${id}`);
  }
}
