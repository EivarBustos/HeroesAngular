import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-card-hero',
  templateUrl: './card-hero.component.html',
  styles: [
  ]
})
export class CardHeroComponent implements OnInit {


  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if(!this.hero) throw Error('Hero propety is required')
  }



}
