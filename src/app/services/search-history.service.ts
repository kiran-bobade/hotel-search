import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { isNullOrUndefined } from 'util';
import { SearchData } from '../models/search-data';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  constructor() { }

  public getHistory(): SearchData[] {
    const recentSearches = localStorage.getItem(Constants.KEY_RECENT_SEARCH);
    if (isNullOrUndefined(recentSearches)) { return []; }
    return JSON.parse(recentSearches);
  }

  public update(searchData: SearchData): void {
    if (this.isDuplicate(searchData)) { return; }
    const history = this.getHistory();
    history.push(searchData);
    localStorage.setItem(Constants.KEY_RECENT_SEARCH, JSON.stringify(history));
  }

  public delete(uid: string) {
    let history = this.getHistory();
    console.log('history before delete', history);
    const foundIndex = history.findIndex(value => value.uid === uid);
    history = history.splice(foundIndex, 1);
    console.log('history after delete', history);
  }

  private isDuplicate(searchData: SearchData): boolean {
    const history = this.getHistory();
    if (history.length === 0) { return false; }
    return history.some(data => {
      return (
        data.location.city === searchData.location.city
        && data.guestCount === searchData.guestCount
        && data.checkInDate.year === searchData.checkInDate.year
        && data.checkInDate.month === searchData.checkInDate.month
        && data.checkInDate.day === searchData.checkInDate.day
        && data.checkOutDate.year === searchData.checkOutDate.year
        && data.checkOutDate.month === searchData.checkOutDate.month
        && data.checkOutDate.day === searchData.checkOutDate.day
      );
    });
  }
}
