import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [LocationService]
})
export class SearchFormComponent implements OnInit {

  public checkOutDate: NgbDateStruct;
  public checkInDate: NgbDateStruct;
  public today = this.calendar.getToday();
  public searchTerm: string;

  constructor(
    private readonly calendar: NgbCalendar,
    private readonly router: Router,
    private readonly locationService: LocationService,
    private readonly httpClient: HttpClient) {
  }

  public ngOnInit(): void {

  }

  public searchHotels(): void {
    this.router.navigate(['result'], {
      queryParams: {
        cin: '',
        cout: '',
        gst: 4,
        lat: 28.242,
        lang: 49.2254
      }
    });
  }

  public searchLocation = (searchText: Observable<string>) =>
    searchText.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 3 ? [] :
          this.locationService.getLocations(term)
            .pipe(
              map(locations =>
                locations
                  .filter(loc => loc.city.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1)
                  .slice(0, 10)
              )
            )
      ))

  public geolocate(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // this.locationService.getCurrentLocation().subscribe();
      });
    }
  }

  public resultFormatter(value: any) {
    return value.city;
  }

  public inputFormatter(value: any) {
    if (value.city) {
      return value.city;
    }
    return value;
  }
}
