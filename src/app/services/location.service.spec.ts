import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '../models/location';

describe('LocationService:', () => {
  // tslint:disable-next-line:prefer-const
  let mockHttpClient: HttpTestingController;
  // tslint:disable-next-line:prefer-const
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    service = TestBed.get(LocationService);
    mockHttpClient = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    mockHttpClient.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive locations from API', () => {
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

    service.getLocations().subscribe(locations => {
      expect(locations.length).toBe(2);
      expect(locations).toEqual(dummyLocations);
    });

    const request = mockHttpClient.expectOne('/assets/mocked-locations.json');
    expect(request.request.method).toBe('GET');
    request.flush(dummyLocations);
  });
});
