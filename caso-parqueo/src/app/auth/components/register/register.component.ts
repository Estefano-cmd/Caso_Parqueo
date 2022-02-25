import { Employees } from './../../../shared/types/employees';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeesService } from './../../../shared/services/employees.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '../../../shared/services/session.service';
import { Session } from '../../../shared/types/Session';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  msgError$ = new BehaviorSubject<string>(null);
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      avatar: [[137, 80, 78, 71], Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direction: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    this.route.navigate(['auth', 'login']);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const {login, password} = this.form.value;
    this.employeesService.create(this.form.value).pipe(
      switchMap((employe: Employees) => this.authService.login({login, password}))
    ).subscribe(
      (session: Session) => {
        this.sessionService.setSession(session);
        this.route.navigate(['dashboard']);
      },
      ((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): void {
    console.log(error);
    this.snackBar.open('Error al registrar', 'OK');
  }
}
