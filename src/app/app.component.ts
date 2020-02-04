import { Component } from '@angular/core';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isDevMode: boolean;
  constructor() {
    this.isDevMode = isDevMode();
  }
}
