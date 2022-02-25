import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { PlaceService } from '../shared/services/place.service.ts.service';
import { Place } from '../shared/types/Place';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  placesAll$ = new BehaviorSubject<Array<Place>>([]);
  currentPlaces = [];
  types = ['A', 'B', 'C', 'D', 'E'];
  activeType = this.types[0];
  constructor(
    private snackBar: MatSnackBar,
    private placeService: PlaceService,
  ) { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getAll().subscribe(
      (places: Array<Place>) => {
        this.placesAll$.next(places);
        this.setCurrentPlaces(places);
      },
      (error) => this.handleError(error)
    );
  }

  onChangeType(type: string): void {
    this.activeType = type;
    const places =  this.placesAll$.getValue() as Array<Place>;
    this.setCurrentPlaces(places, type);
  }

  setCurrentPlaces(places: Array<Place>, type: string = 'A'): void {
    this.currentPlaces = places.filter((place: Place) => {
      const types =  place.fullname.match(/[A-Za-z]+/g);
      return types.includes(type);
    });
    console.log(this.currentPlaces);
  }

  handleError(data: HttpErrorResponse): void {
    this.snackBar.open('Error de servidor', 'OK');
  }
}
