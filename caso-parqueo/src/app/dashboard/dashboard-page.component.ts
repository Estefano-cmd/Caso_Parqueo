import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../shared/services/place.service.ts.service';
import { Place } from '../shared/types/Place';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  
  places: Place[] | any
  
  constructor(
    
    private placeService: PlaceService,

  ) { }
  
  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(){
    this.placeService.getAll().subscribe(
      res =>{
        this.places = res;
      },
      err => console.log("LUGARES NO CARGADOS")
    )
  }

}
