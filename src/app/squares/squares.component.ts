import { Component, OnInit } from '@angular/core';
import { Square } from '../square/square';

@Component({
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css']
})
export class SquaresComponent implements OnInit {

  public squares: Square[] = [];

  constructor() {
    this.setSquares();
  }

  ngOnInit() {
  }

  setSquares() {
    this.squares.push(new Square('div', ['first-column', 'first-row']));
    this.squares.push(new Square('div', ['first-row']));
    this.squares.push(new Square('div', ['first-row']));
    this.squares.push(new Square('div', ['first-row']));
    this.squares.push(new Square('div', ['first-row']));
    this.squares.push(new Square('div', ['first-row']));
    this.squares.push(new Square('div', ['last-column', 'first-row']));

    this.squares.push(new Square('div', ['first-column']));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div', ['last-column']));

    this.squares.push(new Square('div', ['first-column']));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('a', ['notEmpty', 'hasImage'], '_blank',
      `<div class="heading heading-with-break">
      open source<br>github
      </div>
      <img src="/assets/thumbs/small/github.png" style="display: none;">`
    ));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('a', ['notEmpty', 'hasImage'], '_blank',
      `<div class="heading heading-with-break">
      foodcoop<br>shop.com
      </div>
      <img src="/assets/thumbs/small/foodcoopshop.png" style="display: none;">`
    ));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div', ['last-column']));

    this.squares.push(new Square('div', ['first-column']));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div'));
    this.squares.push(new Square('div', ['last-column']));

    this.squares.push(new Square('div', ['first-column', 'last-row']));
    this.squares.push(new Square('a', ['last-row', 'projects', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading" style="margin-top: 22px;">
      <span class="lang de" style="display: inline;">projekte</span>
    </div>`
    ));
    this.squares.push(new Square('a', ['last-row', 'contact', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading" style="margin-top: 22px;">
      <span class="lang de" style="display: inline;">kontakt</span>
    </div>`
    ));
    this.squares.push(new Square('a', ['last-row', 'about', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading" style="margin-top: 22px;">
      <span class="lang de" style="display: inline;">über mich</span>
    </div>`
    ));
    this.squares.push(new Square('a', ['last-row', 'imprint', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading" style="margin-top: 22px;">
      <span class="lang de" style="display: inline;">impressum</span>
    </div>`
    ));
    this.squares.push(new Square('a', ['last-row', 'privacy', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading" style="margin-top: 22px;">
      <span class="lang de" style="display: inline;">datenschutz</span>
    </div>`
    ));
    this.squares.push(new Square('div', ['last-column', 'last-row']));

  }

}
