import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { RecentSearchBoxComponent } from '../recent-search-box/recent-search-box.component';
import { FormsModule } from '@angular/forms';
import { MustHaveDiffDirective } from '../utils/date-diff.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, FlexLayoutModule, FontAwesomeModule,
        NgbModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [SearchPageComponent, SearchFormComponent,
        RecentSearchBoxComponent, MustHaveDiffDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
