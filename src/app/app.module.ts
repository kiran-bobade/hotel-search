import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbModule, NgbRatingModule,
  NgbButtonsModule,
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbDateParserFormatter,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ListingItemComponent } from './listing-item/listing-item.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { MomentDateParser } from './utils/date-parser';
import { SearchPageComponent } from './search-page/search-page.component';
import { RecentSearchBoxComponent } from './recent-search-box/recent-search-box.component';
import { MustHaveDiffDirective } from './utils/date-diff.directive';
import { RatingComponent } from './rating/rating.component';
import { ThousandSeparatorPipe } from './utils/thousand-separator.pipe';
import { NgbDateFormatterPipe } from './utils/date-formatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ListingItemComponent,
    SearchResultComponent,
    SearchPageComponent,
    RecentSearchBoxComponent,
    MustHaveDiffDirective,
    RatingComponent,
    ThousandSeparatorPipe,
    NgbDateFormatterPipe
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbRatingModule,
    NgbButtonsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FlexLayoutModule,
    MomentModule,
    HttpClientModule,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: MomentDateParser }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
