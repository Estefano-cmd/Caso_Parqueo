import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './shared/services/employees.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Employees } from './shared/types/employees';
import { PlaceService } from './shared/services/place.service.ts.service';

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
  constructor(private employeesService: EmployeesService, private placeService: PlaceService) {
  }

  async ngOnInit(): Promise<void> {
    this.employeesService.getAll().subscribe((employees: Array<Employees>) => {
      this.employees$.next(employees);
      this.setUI({ loading: false });
    });

    // const CATEGORIES = ["A", "B", "C", "D", "E"]
    // const TOTALS= [1,2,3,4,5,6,7,8,9,10]

    // for (const c of CATEGORIES) {
    //   for (const [t] of TOTALS.entries()) {
    //     setTimeout(async () => {
    //       console.log(`${c}${t+1}`)
    //       await this.placeService.create({ name: `${c}${t}`, state: false, createdAt: new Date(), updatedAt: new Date() }).toPromise()
    //     }, 3000)
    //   }
    // }

  }

  setUI(data: Partial<UI>): void {
    this.ui$.pipe(take(1)).subscribe((ui: UI) => {
      this.ui$.next({...ui, ...data});
    });
  }
}
