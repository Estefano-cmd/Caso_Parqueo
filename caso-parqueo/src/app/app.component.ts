import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './shared/services/employees.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Employees } from './shared/types/employees';

interface UI {
  loading: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'caso-parqueo';
  ui$ = new BehaviorSubject<UI>({
    loading: true
  });
  employees$ = new BehaviorSubject<any>([]);
  constructor(private employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.employeesService.getAll().subscribe((employees: Array<Employees>) => {
      this.employees$.next(employees);
      this.setUI({ loading: false });
    });
  }

  setUI(data: Partial<UI>): void {
    this.ui$.pipe(take(1)).subscribe((ui: UI) => {
      this.ui$.next({...ui, ...data});
    });
  }
}
