import { Component, OnInit, Input } from '@angular/core';
import { SearchData } from '../models/search-data';
import { SearchHistoryService } from '../services/search-history.service';
import { Router } from '@angular/router';
import { Util } from '../utils/util';

@Component({
  selector: 'app-recent-search-box',
  templateUrl: './recent-search-box.component.html',
  styleUrls: ['./recent-search-box.component.scss']
})
export class RecentSearchBoxComponent {

  @Input() data: SearchData;
  public iconStyles = { stroke: 'gray', color: 'gray' };

  constructor(
    private readonly searchHistory: SearchHistoryService,
    private readonly router: Router) { }

  public removeHistory(item: SearchData) {
    this.searchHistory.delete(item.uid);
  }

  /**
   * Search hotels based on searchData model
   * @param item: SearchData model
   */
  public applySearch(item: SearchData): void {
    this.router.navigate(['result'], {
      queryParams: {
        cin: Util.toQueryParams(item.checkInDate),
        cout: Util.toQueryParams(item.checkOutDate),
        gst: item.guestCount,
        lat: item.location.latitude,
        lang: item.location.longitude,
        city: item.location.city
      }
    });
  }
}
