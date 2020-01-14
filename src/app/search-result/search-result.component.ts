import { Component, OnInit, OnChanges } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../utils/util';
import { SearchData } from '../models/search-data';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public searchData: SearchData;
  public searchResult: any = {};

  public page = {
    size: 3,
    current: 1
  };

  public sort = {
    diplayProperty: 'Rating',
    property: 'rating',
    order: 'desc'
  };

  constructor(
    private readonly searchService: SearchService,
    private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.extractQueryParams(params);
      this.search();
    });
  }

  public search() {
    this.searchService.searchHotels(this.page, this.sort,
      { city: this.searchData.location.city }).subscribe((data) => {
        this.searchResult = data;
      });
  }

  public orderBy(property: string, order: string): void {
    switch (property) {
      case 'price':
        if (order === 'asc') {
          this.sort.diplayProperty = 'Price low-high';
        } else {
          this.sort.diplayProperty = 'Price high-low';
        }
        break;
      default:
        this.sort.diplayProperty = 'Rating';
        break;
    }

    this.sort.property = property;
    this.sort.order = order;
    this.search();
  }


  private extractQueryParams(params: any) {
    if (!Util.isEmptyObject(params)) {
      this.searchData = new SearchData();
      this.searchData.checkInDate = Util.valuesToInt(Util.toObject(params.cin));
      this.searchData.checkOutDate = Util.valuesToInt(Util.toObject(params.cout));
      this.searchData.guestCount = parseInt(params.gst, 0);
      this.searchData.location.city = params.city;
    }
  }
}
