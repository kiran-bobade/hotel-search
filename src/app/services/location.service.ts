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

  constructor(private httpClient: HttpClient) {
  }

  public getLocations(query: string): Observable<Location[]> {
    return this.httpClient.get('/assets/mocked-locations.json')
      .pipe(
        map((locs: Location[]) => {
          this.LOCATIONS = locs;
          return this.LOCATIONS;
        }));
  }
}
