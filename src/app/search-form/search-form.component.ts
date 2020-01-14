import { Component, OnInit, Input } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../services/location.service';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, isEmpty } from 'rxjs/operators';
import { SearchData } from '../models/search-data';
import { SearchHistoryService } from '../services/search-history.service';
import { Util } from '../utils/util';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [LocationService]
})
export class SearchFormComponent implements OnInit {

  @Input() layout = 'column wrap';

  public searchData: SearchData;
  public today = this.calendar.getToday();
  public searchTerm: any;
  public minDate = {};
  public searchExpanded = true;
  public summaryIconStyle = {
    color: '#cdcdcd',
  };
  public isMobileView = false;

  constructor(
    private readonly calendar: NgbCalendar,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly locationService: LocationService,
    private readonly searchHistory: SearchHistoryService,
    private readonly breakpointObserver: BreakpointObserver) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  public ngOnInit(): void {
    this.searchData = new SearchData();

    this.parseQueryParams();

    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobileView = state.matches;
      });
  }

  /**
   * Parses query paramters and extract search properties
   */
  private parseQueryParams() {
    this.route.queryParams.subscribe((params: any) => {
      if (!Util.isEmptyObject(params)) {
        this.searchData.checkInDate = Util.valuesToInt(Util.toObject(params.cin));
        this.searchData.checkOutDate = Util.valuesToInt(Util.toObject(params.cout));
        this.searchData.guestCount = parseInt(params.gst, 0);
        this.searchData.location.city = params.city;
        this.searchTerm = params.city;
      }
    });
  }

  /**
   * Search hotels using parsed query parameters
   * and updates search history
   */
  public searchHotels(): void {
    this.searchHistory.update(this.searchData);
    this.router.navigate(['result'], {
      queryParams: {
        cin: Util.toQueryParams(this.searchData.checkInDate),
        cout: Util.toQueryParams(this.searchData.checkOutDate),
        gst: this.searchData.guestCount,
        lat: this.searchData.location.latitude,
        lang: this.searchData.location.longitude,
        city: this.searchData.location.city
      }
    });
  }

  /**
   * Sets location data coming from UI to searchData model
   * @param location: currently selected location
   */
  public setSearchLocation(location: any): void {
    this.searchData.location = location.item;
  }

  /**
   * Asks for user permission to share for Geolocation
   */
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

  /**
   * Format autocomplete selected value for output
   * @param value: Value selected in autocomplete input
   */
  public resultFormatter(value: any) {
    return value.city;
  }

  /**
   * Format autocomplete selected value for input
   * @param value: Value selected in autocomplete input
   */
  public inputFormatter(value: any) {
    if (value.city) {
      return value.city;
    }
    return value;
  }

  /**
   * Sets Guest count to searchData model
   * @param count: Guest count
   */
  public setGuestCount(count: number): void {
    this.searchData.guestCount = count;
  }

  /**
   * Checks if current guest count is selected in searchData model
   * @param count: Guest count
   */
  public isSelectedGuestCount(count: number): boolean {
    return this.searchData.guestCount === count;
  }

  /**
   * Switch Check-in and Check-out dates
   */
  public switchDates() {
    const tempDate = this.searchData.checkOutDate;
    this.searchData.checkOutDate = this.searchData.checkInDate;
    this.searchData.checkInDate = tempDate;
  }

  /**
   * Expands search form
   */
  public expandSearch() {
    this.searchExpanded = !this.searchExpanded;
  }

  /**
   * Search location based on user input stream
   */
  public searchLocation = (searchText: Observable<string>) =>
    searchText.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 3 ? [] :
          this.locationService.getLocations()
            .pipe(
              map(locations =>
                locations
                  .filter(loc => loc.city.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1)
                  .slice(0, 10)
              )
            )
      ))
}
