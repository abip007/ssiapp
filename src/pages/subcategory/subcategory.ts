import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{SSApi} from '../../Shared/serversupplyService';
import {SScategoryPage  } from '../SSCategory/SSCategory';
import { SearchPage } from '../search/search';
/*
  Generated class for the Subcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html'
})
export class SubcategoryPage {
 cat:any={};
 subcategory:any[];
  constructor(public nav: NavController, 
  public navParams: NavParams,
  public sapi:SSApi
  
  ) {}

  ionViewDidLoad() {
    this.cat=this.navParams.data;
    this.sapi.getSubCategory(this.navParams.data.catid).subscribe(data=>{
      this.subcategory=data;
     // console.log(this.navParams.data)
    })

    
  }
   goToSeach()
  {
        this.nav.push(SearchPage);
  }
goSSubcat($event, item)
  {
      this.nav.push(SScategoryPage,item)
  }
}
