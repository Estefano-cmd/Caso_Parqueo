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
    const session = this.session$.getValue() as Session;
    return !!(session);
  }

  setSession(session: Session): void {
    this.session$.next(session);
  }

  getSession(): Session {
    return this.session$.getValue() as Session;
  }

  clearSession(): void {
    this.session$.next(null);
  }
}
