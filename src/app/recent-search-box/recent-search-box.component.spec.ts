import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchBoxComponent } from './recent-search-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchHistoryService } from '../services/search-history.service';

describe('RecentSearchBoxComponent', () => {
  let component: RecentSearchBoxComponent;
  let fixture: ComponentFixture<RecentSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [RecentSearchBoxComponent],
      providers: [SearchHistoryService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchBoxComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
