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
      ['notEmpty', 'hasImage'],
      '_blank',
      ['heading', 'heading-with-break'],
      'open source<br>github',
      '/assets/thumbs/small/github.png',
      'https://github.com/mrothauer',
    ),
    new Square('div'),
    new Square(
      'a',
      ['notEmpty', 'hasImage'],
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
    new Square('a', ['last-row', 'projects', 'notEmpty', 'hasNoImage'], null,
      ['heading'],
      'projekte'
    ),
    new Square('a', ['last-row', 'contact', 'notEmpty', 'hasNoImage'], null,
      ['heading'],
      'kontakt'
    ),
    new Square('a', ['last-row', 'about', 'notEmpty', 'hasNoImage'], null,
      ['heading'],
      'über mich'
    ),
    new Square('a', ['last-row', 'imprint', 'notEmpty', 'hasNoImage'], null,
      ['heading'],
      'impressum'
    ),
    new Square('a', ['last-row', 'privacy', 'notEmpty', 'hasNoImage'], null,
      ['heading'],
      'datenschutz'
    ),
    new Square('div', ['last-column', 'last-row']),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
