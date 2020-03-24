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
    new Square(
      'a',
      ['hasImage'],
      '_blank',
      ['heading', 'heading-with-break'],
      'open source<br>github',
      '/assets/thumbs/small/github.png',
      'https://github.com/mrothauer',
    ),
    new Square('div'),
    new Square(
      'a',
      ['hasImage'],
      '_blank',
      ['heading', 'heading-with-break'],
      'foodcoop<br>shop.com',
      '/assets/thumbs/small/foodcoopshop.png',
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
    new Square('a', ['last-row', 'projects', 'hasNoImage'], null,
      ['heading'],
      'projekte',
      null,
      null,
      'projects',
    ),
    new Square('a', ['last-row', 'contact', 'hasNoImage'], null,
      ['heading'],
      'kontakt',
      null,
      null,
      'contact',
    ),
    new Square('a', ['last-row', 'about', 'hasNoImage'], null,
      ['heading'],
      'über mich',
      null,
      null,
      'about',
    ),
    new Square('a', ['last-row', 'imprint', 'hasNoImage'], null,
      ['heading'],
      'impressum',
      null,
      null,
      'imprint',
    ),
    new Square('a', ['last-row', 'privacy', 'hasNoImage'], null,
      ['heading'],
      'datenschutz',
      null,
      null,
      'privacy',
    ),
    new Square('div', ['last-column', 'last-row']),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
