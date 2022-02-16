import { Vehicle } from './../types/Vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(`${environment.endpoints}/vehicle`);
  }

  getOne(id: number): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(`${environment.endpoints}/vehicle/${id}`);
  }

  create(data: Vehicle): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/vehicle`, data);
  }

  update(id: number, data: Partial<Vehicle>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/vehicle/${id}`, data);
  }

  delete(id: number): Observable<Array<Vehicle>> {
    return this.http.delete<Array<Vehicle>>(`${environment.endpoints}/vehicle/${id}`);
  }
}
