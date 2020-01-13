import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private LOCATIONS: Location[] = [];
  private URI = '/assets/mocked-locations.json';
  constructor(private httpClient: HttpClient) {
  }

  public getLocations(): Observable<Location[]> {
    return this.httpClient.get(this.URI)
      .pipe(
        map((locs: Location[]) => {
          this.LOCATIONS = locs;
          return this.LOCATIONS;
        }));
  }
}
