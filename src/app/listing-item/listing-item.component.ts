import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../utils/util';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  @Input() listItem: any;

  public ratingBadge = {};
  public guestCount = 2;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.ratingBadge = {
      'badge-success': this.listItem.rating.value >= 4,
      'badge-warning': (this.listItem.rating.value > 3 && this.listItem.rating.value < 4),
      'badge-danger': this.listItem.rating.value < 3
    };

    this.parseQueryParams();
  }

  private parseQueryParams() {
    this.route.queryParams.subscribe((params: any) => {
      if (!Util.isEmptyObject(params)) {
        this.guestCount = parseInt(params.gst, 0);
      }
    });
  }


}
