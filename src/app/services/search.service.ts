import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }


  public searchHotels(page: any, sortBy?: any, filters?: any): Observable<any> {
    return this.httpClient.get('/assets/mocked-hotels.json')
      .pipe(
        map((hdata: any) => {
          const hotels = hdata.hotels.filter(hotel => {
            if (filters) {
              if (filters.city && filters.city.length > 0) {
                return hotel.locality.city.toLowerCase() === filters.city.toLowerCase();
              }
            }
          });
          return { total: hotels.length, hotels };
        }),
        map((dt: any) => {
          const sorted = dt.hotels.sort((item1, item2) => this.sortBy(item1, item2, sortBy));
          return { total: dt.total, hotels: sorted };
        }),
        map((filtered: any) => {
          const filteredHotels = Object.assign([], filtered.hotels);

          let startIndex = 0;
          if (page.current === 1) {
            startIndex = page.current - 1;
          } else {
            if (page.current === (filtered.length - 1)) {
              startIndex = page.current;
            } else {
              startIndex = page.current - 1;
            }
          }
          const pagedHotels = filteredHotels.splice(startIndex, page.size);
          return { total: filtered.total, hotels: pagedHotels };
        })
      );
  }

  private sortBy(item1: any, item2: any, sortBy: any): number {
    if (sortBy) {
      switch (sortBy.property) {
        case 'price':
          if (sortBy.order === 'asc') {
            return (item1.minPrice.price > item2.minPrice.price) ? 1 : -1;
          } else {
            return (item2.minPrice.price > item1.minPrice.price) ? 1 : -1;
          }
        default:
          return (item1.rating.value < item2.rating.value) ? 1 : -1;
      }
    }
    return (item1.rating.value < item2.rating.value) ? 1 : -1;
  }
}
