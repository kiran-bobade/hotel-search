import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {
  public currentRate = 2.2;
  public ratingBadge = {
    'badge-success': this.currentRate >= 4,
    'badge-warning': (this.currentRate > 3 && this.currentRate < 4),
    'badge-danger': this.currentRate < 3
  };

  constructor() { }

  ngOnInit() {
  }

}
