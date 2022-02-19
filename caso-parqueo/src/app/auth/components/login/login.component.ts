import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Session } from '../../../shared/types/Session';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgError$ = new BehaviorSubject<string>(null);
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister(): void {
    this.route.navigate(['auth/register']);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    const { username, password } = this.form.value;
    this.authService.login({ login: username, password }).subscribe(
      (session: Session) => {
        this.sessionService.setSession(session);
        this.route.navigate(['/dashboard']);
      },
      ((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  handleError(data: HttpErrorResponse): void {
    const { message, name } =  data.error;
    if (name === 'Authentication Error.') {
      this.snackBar.open(message, 'OK');
    } else {
      this.snackBar.open('Internal Server Error', 'OK');
    }
  }
}
