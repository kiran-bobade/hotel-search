import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { isNullOrUndefined } from 'util';
import { SearchData } from '../models/search-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  private historySubject = new Subject<SearchData[]>();

  constructor() { }

  public getHistoryObservable() {
    return this.historySubject.asObservable();
  }

  /**
   * Retrives search history
   */
  public getHistory(): SearchData[] {
    const recentSearches = localStorage.getItem(Constants.KEY_RECENT_SEARCH);
    if (isNullOrUndefined(recentSearches)) { return []; }
    return JSON.parse(recentSearches);
  }

  /**
   * Updates search history or add new item in history
   * @param searchData: data model
   */
  public update(searchData: SearchData): void {
    if (this.isDuplicate(searchData)) { return; }
    const history = this.getHistory();
    history.push(searchData);
    this.historySubject.next(history);
    localStorage.setItem(Constants.KEY_RECENT_SEARCH, JSON.stringify(history));
  }

  /**
   * Delets search history
   * @param uid: History id
   */
  public delete(uid: string) {
    const history = this.getHistory();
    const foundIndex = history.findIndex((value, index) => {
      return value.uid === uid;
    });
    history.splice(foundIndex, 1);
    this.historySubject.next(history);
    localStorage.setItem(Constants.KEY_RECENT_SEARCH, JSON.stringify(history));
  }

  /**
   * Checks if history item being added is already present in the history
   * @param searchData: Data model
   */
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
