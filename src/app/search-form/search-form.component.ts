import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  public checkOutDate: NgbDateStruct;
  public checkInDate: NgbDateStruct;
  public today = this.calendar.getToday();

  constructor(private calendar: NgbCalendar, private router: Router) { }

  public ngOnInit(): void {
  }

  public searchHotels(): void {
    this.router.navigate(['result'], {
      queryParams: {
        cin: '',
        cout: '',
        gst: 4,
        lat: 28.242,
        lang: 49.2254
      }
    });
  }

}
