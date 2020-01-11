import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchBoxComponent } from './recent-search-box.component';

describe('RecentSearchBoxComponent', () => {
  let component: RecentSearchBoxComponent;
  let fixture: ComponentFixture<RecentSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
