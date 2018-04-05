import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {
    
  }
goToSeach()
  {
        this.nav.push(SearchPage);
  }
}
