import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { SubcategoryPage } from '../subcategory/subcategory';
import { SearchPage } from '../search/search';
@Component({
  selector: 'page-category',
  styles: [`
    .even { color: red; }
    .odd { color: green; }
    `],
  templateUrl: 'category.html'
})
export class CategoryPage {
Category = [
         {
             catid: 1, cat: 'HARD DRIVES'
         },
         {
             catid: 4, cat: 'TAPE DRIVES'
         },
         {
             catid: 26, cat: 'CONTROLLER'
         },
         {
             catid: 64, cat: 'ACCESSORIES'
         },
         {
             catid: 66, cat: 'MEMORY'
         }
     ];
  constructor(private nav: NavController, 
  private navParams: NavParams,
  private loadingctl:LoadingController
  ) {}
   goToSeach()
  {
        this.nav.push(SearchPage);
  }
  goSubcat($event,cate)
  {
       let loader=this.loadingctl.create(
           {
               content:'Loading..'
           }
       )
       loader.present().then(()=>
       {
        this.nav.push(SubcategoryPage,cate); 
        loader.dismiss();
       });
    }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad CategoryPage');
  }
 
}


