import { Place, PlaceDTO } from './../types/Place';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(`${environment.endpoints}/places`);
  }

  getOne(id: number): Observable<Place> {
    return this.http.get<Place>(`${environment.endpoints}/places/${id}`);
  }

  getByState(state: boolean): Observable<Place> {
    return this.http.get<Place>(`${environment.endpoints}/places/state/${state}`);
  }

  create(data: PlaceDTO): Observable<Place> {
    return this.http.post<Place>(`${environment.endpoints}/places`, data);
  }

  update(data: Partial<PlaceDTO>, id: number ): Observable<null> {
    return this.http.patch<null>(`${environment.endpoints}/places/${id}`, data);
  }
}
