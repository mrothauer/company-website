import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackingComponent } from './tracking/tracking.component';
import { SquareComponent } from './square/square.component';
import { SquaresComponent } from './squares/squares.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackingComponent,
    SquareComponent,
    SquaresComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
