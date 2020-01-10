import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    NgbTypeaheadModule,
    FlexLayoutModule,
    MomentModule,
    HttpClientModule,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    // library.addIcons(faSearch, faCalendar, faMapMarker, faMapMarkerAlt, faMap);
  }
}
