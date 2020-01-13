import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { filter } from 'rxjs/operators';

describe('SearchService: ', () => {
  // tslint:disable-next-line:prefer-const
  let mockHttpClient: HttpTestingController;
  // tslint:disable-next-line:prefer-const
  let service: SearchService;
  const mockData = { hotels: [] };
  const page = {
    size: 1,
    current: 1
  };

  const sort = {
    order: 'desc',
    property: 'rating'
  };

  const filters = {
    city: 'mumbai'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    mockHttpClient = TestBed.get(HttpTestingController);
    service = TestBed.get(SearchService);

    mockData.hotels = [
      {
        id: '3',
        name: 'Courtyard by Marriott Pune Chakan',
        accommodationType: 'Hotel',
        thumbnailUrl: 'https://images.unsplash.com',
        locality: {
          city: 'Pune',
          address: 'Plot P-7, MIDC, Chakan Industrial Area'
        },
        geocode: {
          lng: 72.88486,
          lat: 19.10189
        },
        hasSpecialOffer: false,
        star: 5,
        rating: {
          totalReviews: 975,
          value: 4.6
        },
        minPrice: {
          displayPrice: '4,376',
          price: 4376
        },
        maxPrice: {
          displayPrice: '19,700',
          price: 19700
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'gym',
          'massage',
          'spa',
          'sauna'
        ]
      },
      {
        id: '4',
        name: 'Ramee Grand Pune',
        accommodationType: 'Hotel',
        thumbnailUrl: 'https://images.unsplash.com',
        locality: {
          city: 'Pune',
          address: 'Plot P-7, MIDC, Chakan'
        },
        geocode: {
          lng: 72.88486,
          lat: 19.10189
        },
        hasSpecialOffer: false,
        star: 5,
        rating: {
          totalReviews: 751,
          value: 3.1
        },
        minPrice: {
          displayPrice: '8,562',
          price: 8562
        },
        maxPrice: {
          displayPrice: '13,999',
          price: 13999
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'gym',
          'massage',
          'spa',
          'sauna'
        ]
      },
      {
        id: '5',
        name: 'Royalton',
        accommodationType: 'Hotel',
        thumbnailUrl: 'https://images.unsplash.com',
        locality: {
          city: 'New York',
          address: '44 West 44th Street, 10036, New York, USA'
        },
        geocode: {
          lng: 72.88486,
          lat: 19.10189
        },
        hasSpecialOffer: false,
        star: 7,
        rating: {
          totalReviews: 1201,
          value: 4.8
        },
        minPrice: {
          displayPrice: '12,606',
          price: 12606
        },
        maxPrice: {
          displayPrice: '25399',
          price: 25399
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'gym',
          'spa',
          'pets'
        ]
      },
      {
        id: '1',
        name: 'Hotel Kohinoor Continental',
        accommodationType: 'Hotel',
        thumbnailUrl: 'URL',
        locality: {
          city: 'Mumbai',
          address: 'Patel Complex'
        },
        geocode: {
          lng: 72.88486,
          lat: 19.10189
        },
        hasSpecialOffer: false,
        star: 5,
        rating: {
          totalReviews: 300,
          value: 3.5
        },
        minPrice: {
          displayPrice: '10,376',
          price: 10376
        },
        maxPrice: {
          displayPrice: '22,000',
          price: 22000
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'gym',
          'massage',
          'spa',
          'sauna'
        ]
      },
      {
        id: '2',
        name: 'Sofitel Mumbai BKC',
        accommodationType: 'Hotel',
        thumbnailUrl: 'https://images.unsplash.com',
        locality: {
          city: 'Mumbai',
          address: 'Opposite Johnson and Johnson'
        },
        geocode: {
          lng: 72.86891,
          lat: 19.06773
        },
        hasSpecialOffer: false,
        star: 4,
        rating: {
          totalReviews: 152,
          value: 3.8
        },
        minPrice: {
          displayPrice: '8,499',
          price: 8499
        },
        maxPrice: {
          displayPrice: '12,000',
          price: 12000
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'spa',
          'sauna'
        ]
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search hotels by location', () => {
    const mumbaiHotels = [
      {
        id: '2',
        name: 'Sofitel Mumbai BKC',
        accommodationType: 'Hotel',
        thumbnailUrl: 'https://images.unsplash.com',
        locality: {
          city: 'Mumbai',
          address: 'Opposite Johnson and Johnson'
        },
        geocode: {
          lng: 72.86891,
          lat: 19.06773
        },
        hasSpecialOffer: false,
        star: 4,
        rating: {
          totalReviews: 152,
          value: 3.8
        },
        minPrice: {
          displayPrice: '8,499',
          price: 8499
        },
        maxPrice: {
          displayPrice: '12,000',
          price: 12000
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'spa',
          'sauna'
        ]
      }];

    service.searchHotels(page, sort, filters).subscribe((result) => {
      expect(result.hotels.length).toBe(1);
      expect(result.total).toBe(2);
      expect(result.hotels).toEqual(mumbaiHotels);
    });

    const mockReq = mockHttpClient.expectOne('/assets/mocked-hotels.json');
    expect(mockReq.request.method).toBe('GET');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockData);
  });

  it('should retrive hotels based on pagination', () => {
    service.searchHotels({ current: 1, size: 2 }, sort, filters).subscribe((result) => {
      expect(result.hotels.length).toBe(2);
    });

    const mockReq = mockHttpClient.expectOne('/assets/mocked-hotels.json');
    expect(mockReq.request.method).toBe('GET');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockData);
  });

  it('should sort hotels by price low-high', () => {
    const mumbaiHotels = [
      {
        id: '2',
        name: 'Sofitel Mumbai BKC',
        accommodationType: 'Hotel',
        thumbnailUrl: 'https://images.unsplash.com',
        locality: {
          city: 'Mumbai',
          address: 'Opposite Johnson and Johnson'
        },
        geocode: {
          lng: 72.86891,
          lat: 19.06773
        },
        hasSpecialOffer: false,
        star: 4,
        rating: {
          totalReviews: 152,
          value: 3.8
        },
        minPrice: {
          displayPrice: '8,499',
          price: 8499
        },
        maxPrice: {
          displayPrice: '12,000',
          price: 12000
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'spa',
          'sauna'
        ]
      },
      {
        id: '1',
        name: 'Hotel Kohinoor Continental',
        accommodationType: 'Hotel',
        thumbnailUrl: 'URL',
        locality: {
          city: 'Mumbai',
          address: 'Patel Complex'
        },
        geocode: {
          lng: 72.88486,
          lat: 19.10189
        },
        hasSpecialOffer: false,
        star: 5,
        rating: {
          totalReviews: 300,
          value: 3.5
        },
        minPrice: {
          displayPrice: '10,376',
          price: 10376
        },
        maxPrice: {
          displayPrice: '22,000',
          price: 22000
        },
        highlights: [
          'wifi',
          'parking',
          'swimming pool',
          'free breakfast',
          'air conditioning',
          'television',
          'gym',
          'massage',
          'spa',
          'sauna'
        ]
      }];

    service.searchHotels({ current: 1, size: 2 }, { property: 'price', order: 'asc' }, filters)
      .subscribe((result) => {
        expect(result.hotels.length).toBe(2);
        expect(result.hotels).toEqual(mumbaiHotels);
      });

    const mockReq = mockHttpClient.expectOne('/assets/mocked-hotels.json');
    expect(mockReq.request.method).toBe('GET');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockData);
  });

});
