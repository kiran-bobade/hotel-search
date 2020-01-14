import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MustHaveDiffDirective } from '../utils/date-diff.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { from, of } from 'rxjs';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { Location } from '../models/location';
import { SearchHistoryService } from '../services/search-history.service';
import { NgbDateFormatterPipe } from '../utils/date-formatter.pipe';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, RouterTestingModule, FontAwesomeModule,
        FormsModule, FlexLayoutModule, HttpClientTestingModule],
      declarations: [SearchFormComponent, MustHaveDiffDirective, NgbDateFormatterPipe],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set guest count', () => {
    component.setGuestCount(3);
    expect(component.searchData.guestCount).toBe(3);
  });

  it('should set search location', () => {
    const location = {
      item: {
        city: 'Pune', state: 'Maharashtra', latitude: '72.1524152', longitude: '30.25225'
      }
    };
    component.setSearchLocation(location);
    expect(component.searchData.location).toEqual(location.item);
  });

  it('should be able to switch Check-in & Check-out date', () => {
    const checkIn = component.searchData.checkInDate = { day: 25, month: 1, year: 2020 };
    const checkOut = component.searchData.checkOutDate = { day: 20, month: 1, year: 2020 };
    component.switchDates();
    expect(component.searchData.checkInDate).toEqual(checkOut);
    expect(component.searchData.checkOutDate).toEqual(checkIn);
    const srch = component.searchLocation(of('mumb')).subscribe((data) => {
      expect(data).toEqual('test');
    });
  });

  it('should be able to retrive locations for autocomplete', () => {

    const dummyLocations: Location[] = [
      {
        city: 'Mumbai',
        latitude: '18.908885',
        longitude: '72.831116',
        state: 'Maharashtra'
      },
      {
        city: 'Pune',
        latitude: '18.5204',
        longitude: '73.8567',
        state: 'Maharashtra'
      }
    ];

    const serviceCall = fixture.debugElement.injector.get(LocationService);
    spyOn(serviceCall, 'getLocations').and.callFake(() => {
      return of(dummyLocations);
    });
    component.searchLocation(of('mumb')).subscribe((data) => {
      expect(data).toEqual([{
        city: 'Mumbai',
        latitude: '18.908885',
        longitude: '72.831116',
        state: 'Maharashtra'
      }]);
    });
  });

  it('\'Search hotels\' shoud navigate to results page', fakeAsync(() => {
    const router = fixture.debugElement.injector.get(Router);
    const historyService = fixture.debugElement.injector.get(SearchHistoryService);

    const navigate = spyOn(router, 'navigate');
    spyOn(historyService, 'update');
    component.searchHotels();

    expect(navigate).toHaveBeenCalledWith(['result'], {
      queryParams: { cin: '', cout: '', gst: 2, lat: '', lang: '', city: '' }
    });
  }));
});
