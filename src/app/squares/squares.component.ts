import { Component, OnInit } from '@angular/core';
import { Square } from '../square/square';

@Component({
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css']
})
export class SquaresComponent implements OnInit {

  public squares: Square[] = [

    new Square('div', ['first-column', 'first-row']),
    new Square('div', ['first-row']),
    new Square('div', ['first-row']),
    new Square('div', ['first-row']),
    new Square('div', ['first-row']),
    new Square('div', ['first-row']),
    new Square('div', ['last-column', 'first-row']),

    new Square('div', ['first-column']),
    new Square('div'),
    new Square('div'),
    new Square('div'),
    new Square('div'),
    new Square('div'),
    new Square('div', ['last-column']),

    new Square('div', ['first-column']),
    new Square('div'),
    new Square('a', ['notEmpty', 'hasImage'], '_blank',
      `<div class="heading heading-with-break">
      open source<br>github
      </div>
      <img src="/assets/thumbs/small/github.png" class="hover-image">`,
      'https://github.com/mrothauer',
    ),
    new Square('div'),
    new Square('a', ['notEmpty', 'hasImage'], '_blank',
      `<div class="heading heading-with-break">
      foodcoop<br>shop.com
      </div>
      <img src="/assets/thumbs/small/foodcoopshop.png" class="hover-image">`,
      'https://www.foodcoopshop.com',
    ),
    new Square('div'),
    new Square('div', ['last-column']),

    new Square('div', ['first-column']),
    new Square('div'),
    new Square('div'),
    new Square('div'),
    new Square('div'),
    new Square('div'),
    new Square('div', ['last-column']),

    new Square('div', ['first-column', 'last-row']),
    new Square('a', ['last-row', 'projects', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading">
      <span class="lang de">projekte</span>
      </div>`
    ),
    new Square('a', ['last-row', 'contact', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading">
      <span class="lang de">kontakt</span>
    </div>`
    ),
    new Square('a', ['last-row', 'about', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading">
      <span class="lang de">über mich</span>
    </div>`
    ),
    new Square('a', ['last-row', 'imprint', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading">
      <span class="lang de">impressum</span>
    </div>`
    ),
    new Square('a', ['last-row', 'privacy', 'notEmpty', 'hasNoImage'], null,
      `<div class="heading">
      <span class="lang de">datenschutz</span>
    </div>`
    ),
    new Square('div', ['last-column', 'last-row']),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
