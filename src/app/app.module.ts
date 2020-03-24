import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DescComponent } from './desc/desc.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TrackingComponent } from './tracking/tracking.component';
import { SquareComponent } from './square/square.component';
import { SquaresComponent } from './squares/squares.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    DescComponent,
    ImprintComponent,
    PrivacyComponent,
    TrackingComponent,
    SquareComponent,
    SquaresComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
