import { Component, OnInit, Input } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchData } from '../models/search-data';
import { isNullOrUndefined } from 'util';
import { Constants } from '../utils/constants';
import { SearchHistoryService } from '../services/search-history.service';
import { Util } from '../utils/util';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [LocationService]
})
export class SearchFormComponent implements OnInit {
  public searchData: SearchData;
  public today = this.calendar.getToday();
  public searchTerm: any;

  @Input() layout = 'column';
  constructor(
    private readonly calendar: NgbCalendar,
    private readonly router: Router,
    private readonly locationService: LocationService,
    private searchHistory: SearchHistoryService) {
  }

  public ngOnInit(): void {
    this.searchData = new SearchData();
  }

  public searchHotels(): void {
    this.searchHistory.update(this.searchData);
    this.router.navigate(['result'], {
      queryParams: {
        cin: Util.toQueryParams(this.searchData.checkInDate),
        cout: Util.toQueryParams(this.searchData.checkOutDate),
        gst: this.searchData.guestCount,
        lat: this.searchData.location.latitude,
        lang: this.searchData.location.longitude
      }
    });
  }

  public setSearchLocation(location: any): void {
    console.log('loc', location);
    this.searchData.location = location;
  }

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

  public setGuestCount(count: number): void {
    this.searchData.guestCount = count;
  }

  public isSelectedGuestCount(count: number): boolean {
    return this.searchData.guestCount === count;
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
}
