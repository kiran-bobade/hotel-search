import { Component, OnInit, Input } from '@angular/core';
import { SearchData } from '../models/search-data';
import { SearchHistoryService } from '../services/search-history.service';

@Component({
  selector: 'app-recent-search-box',
  templateUrl: './recent-search-box.component.html',
  styleUrls: ['./recent-search-box.component.scss']
})
export class RecentSearchBoxComponent {

  @Input() data: SearchData;
  public iconStyles = { stroke: 'gray', color: 'gray' };

  constructor(private searchHistory: SearchHistoryService) { }

  public removeHistory(item: SearchData) {
    this.searchHistory.delete(item.uid);
  }

  public applySearch(item: SearchData): void {

  }
}
