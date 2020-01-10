import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  NgbModule, NgbRatingModule,
  NgbButtonsModule,
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import { faMapMarker, faMapMarkedAlt, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ListingItemComponent } from './listing-item/listing-item.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { MomentDateFormatter } from './utils/date-formatter';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ListingItemComponent,
    SearchResultComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbRatingModule,
    NgbButtonsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    FlexLayoutModule,
    MomentModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(faSearch, faCalendar, faMapMarker, faMapMarkerAlt, faMap);
  }
}
