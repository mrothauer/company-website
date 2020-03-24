import { Component, OnInit, Input } from '@angular/core';
import { Square } from './square';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() square: Square;
  @Input() index: number;
  public showBackgroundImage = false;
  public visibleContent = 'about';

  constructor() { }

  ngOnInit() {
  }

  toggleBackgroundImage(): void {
    this.showBackgroundImage = !this.showBackgroundImage;
  }

  toggleContent(id: string): void {
    this.visibleContent = id;
  }

}
