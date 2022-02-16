import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../shared/types/Session';
import { environment } from '../../../environments/environment';
import { Credentials } from '../types/Credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<Session> {
    return this.http.post<Session>(`${environment.endpoints}/login`, credentials);
  }
}
