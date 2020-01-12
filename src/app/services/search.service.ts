import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }


  public getHotels(query: string): Observable<any[]> {
    return this.httpClient.get('/assets/mocked-hotels.json')
      .pipe(
        map((hotels: any) => {
          return hotels.data;
        }));
  }
}
