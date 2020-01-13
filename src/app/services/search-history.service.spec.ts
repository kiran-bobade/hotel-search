import { TestBed } from '@angular/core/testing';

import { SearchHistoryService } from './search-history.service';
import { SearchData } from '../models/search-data';

describe('SearchHistoryService', () => {

  let historyService: SearchHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    historyService = TestBed.get(SearchHistoryService);
  });

  it('should be created', () => {
    expect(historyService).toBeTruthy();
  });

  it('should be able to update and retrive history', () => {
    const historyData = new SearchData();
    historyData.guestCount = 4;
    historyData.location.city = 'Mumbai';
    historyData.location.state = 'Maharashtra';
    historyData.checkInDate = { year: 2020, month: 2, day: 14 };
    historyData.checkOutDate = { year: 2020, month: 2, day: 20 };

    historyService.update(historyData);
    const history = historyService.getHistory();
    expect(history.length).toBe(1);
  });

  it('should delete a history record', () => {
    const historyData = new SearchData();
    historyData.uid = '123456';
    historyData.guestCount = 4;
    historyData.location.city = 'Mumbai';
    historyData.location.state = 'Maharashtra';
    historyData.checkInDate = { year: 2020, month: 2, day: 14 };
    historyData.checkOutDate = { year: 2020, month: 2, day: 20 };

    historyService.update(historyData);
    historyService.delete(historyData.uid);
    const history = historyService.getHistory();
    expect(history.length).toBe(0);
  });
});
