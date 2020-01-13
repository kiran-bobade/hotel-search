import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingItemComponent } from './listing-item.component';
import { NgbRatingModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from '../rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThousandSeparatorPipe } from '../utils/thousand-separator.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListingItemComponent', () => {
  let component: ListingItemComponent;
  let fixture: ComponentFixture<ListingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, NgbRatingModule, FontAwesomeModule, RouterTestingModule],
      declarations: [ListingItemComponent, RatingComponent, ThousandSeparatorPipe],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingItemComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
