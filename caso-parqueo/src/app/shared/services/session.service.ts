import { Injectable } from '@angular/core';
import { Session } from '../../shared/types/Session';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session$: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
  constructor() { }

  isLoggedIn(): boolean {
    const session = this.getSession() as Session;
    return !!(session);
  }

  setSession(session: Session): void {
    this.session$.next(session);
    window.localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): Session {
    const session = window.localStorage.getItem('session');
    if (!session) {
      return null;
    }
    this.session$.next(JSON.parse(session));
    return this.session$.getValue() as Session;
  }

  clearSession(): void {
    this.session$.next(null);
    window.localStorage.setItem('session', null);
  }
}
