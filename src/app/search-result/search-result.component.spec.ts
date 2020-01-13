import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MustHaveDiffDirective } from '../utils/date-diff.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListingItemComponent } from '../listing-item/listing-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingComponent } from '../rating/rating.component';
import { ThousandSeparatorPipe } from '../utils/thousand-separator.pipe';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, FlexLayoutModule, NgbModule, FontAwesomeModule,
        RouterTestingModule, HttpClientTestingModule],
      declarations: [SearchResultComponent, RatingComponent, SearchFormComponent,
        ListingItemComponent, MustHaveDiffDirective, ThousandSeparatorPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
