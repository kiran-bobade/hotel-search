import { Component, OnInit } from '@angular/core';
import { SearchHistoryService } from '../services/search-history.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  recentSearches: any[] = [];
  constructor(private readonly historyService: SearchHistoryService) {
  }

  public ngOnInit(): void {
    this.recentSearches = this.historyService.getHistory();

    this.historyService.getHistoryObservable().subscribe((history) => {
      this.recentSearches = history;
    });
  }
}
