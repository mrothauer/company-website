import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isDevMode = false;

  constructor() {
    this.isDevMode = isDevMode();
  }

}
