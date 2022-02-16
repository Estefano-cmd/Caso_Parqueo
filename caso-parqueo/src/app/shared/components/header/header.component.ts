import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Session } from '../../types/Session';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  session$ = new BehaviorSubject<Session>(null);
  constructor(
    private route: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    const session = this.sessionService.getSession();
    this.session$.next(session);
  }

  logout(): void {
    this.sessionService.clearSession();
    this.route.navigate(['/auth']);
  }
}
