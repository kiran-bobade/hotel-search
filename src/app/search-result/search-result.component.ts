import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getHotels('').subscribe((data) => {
      console.log('hotels', data);
    });
  }

}
