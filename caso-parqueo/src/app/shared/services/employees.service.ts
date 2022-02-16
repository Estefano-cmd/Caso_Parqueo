import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employees } from '../types/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Employees>> {
    return this.http.get<Array<Employees>>(`${environment.endpoints}/employees`);
  }
}
