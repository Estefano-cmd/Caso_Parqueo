import { Vehicle, VehicleDTO } from './../types/Vehicle';
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

  getOne(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.endpoints}/vehicle/${id}`);
  }

  getOneByLicensePlate(licensePlate: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.endpoints}/vehicle/licensePlate/${licensePlate}`);
  }

  create(data: VehicleDTO): Observable<null> {
    return this.http.post<null>(`${environment.endpoints}/vehicle`, data);
  }

  update(id: number, data: Partial<VehicleDTO>): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/vehicle/${id}`, data);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.endpoints}/vehicle/${id}`);
  }
}
