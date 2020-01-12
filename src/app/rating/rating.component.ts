import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: 1;
  @Input() symbol = '';
  @Input() maxValue = 5;
  @Input() color = 'orange';

  constructor() { }

  ngOnInit() {
  }

}
