import { Register, RegisterDTO } from './../types/Register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Register>> {
    return this.http.get<Array<Register>>(`${environment.endpoints}/register`);
  }

  getOne(id: number): Observable<Register> {
    return this.http.get<Register>(`${environment.endpoints}/register/${id}`);
  }

  getOneByClientId(id: number): Observable<Register> {
    return this.http.get<Register>(`${environment.endpoints}/register/client/${id}`);
  }

  getOneByPlaceId(placeId: number): Observable<Register> {
    return this.http.get<Register>(`${environment.endpoints}/register/place/${placeId}`);
  }

  create(data: RegisterDTO): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/register`, data);
  }

  update(id: number, data: Partial<RegisterDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/register/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/register/${id}`);
  }

}
