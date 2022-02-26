import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PlaceService } from '../shared/services/place.service.ts.service';
import { RegisterService } from '../shared/services/register.service';
import { Place } from '../shared/types/Place';
import { InfoComponent } from './components/info/info.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  placesAll$ = new BehaviorSubject<Array<Place>>([]);
  currentPlaces = [];
  types = ['A', 'B', 'C', 'D', 'E'];
  activeType = this.types[0];
  constructor(
    private snackBar: MatSnackBar,
    private placeService: PlaceService,
    private activatedRoute: ActivatedRoute,
    private register: RegisterService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    const { params } = this.activatedRoute.snapshot.queryParamMap;
    this.activeType = (params?.place?.match(/[A-Za-z]+/g)[0] || 'A').toUpperCase();
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getAll().subscribe(
      (places: Array<Place>) => {
        this.placesAll$.next(places);
        this.setCurrentPlaces(places, this.activeType);
      },
      (error) => this.handleError(error)
    );
  }

  onInfoClient(place: Place): void {
    this.register.getOneByPlaceId(place.id).subscribe((data) => {
      console.log(data);
      const dialogRef = this.dialog.open(InfoComponent, {
        data
      });

      dialogRef.afterClosed().subscribe((update) => {
        if (update) {
          this.activeType = (place.name?.match(/[A-Za-z]+/g)[0] || 'A').toUpperCase();
          this.getPlaces();
        }
      });
    });
  }

  onChangeType(type: string): void {
    this.activeType = type;
    const places = this.placesAll$.getValue() as Array<Place>;
    this.setCurrentPlaces(places, type);
  }

  setCurrentPlaces(places: Array<Place>, type: string = 'A'): void {
    this.currentPlaces = places.filter((place: Place) => {
      const types = place.name.match(/[A-Za-z]+/g);
      return types.includes(type);
    });
  }

  handleError(data: HttpErrorResponse): void {
    this.snackBar.open('Error de servidor', 'OK');
  }
}
