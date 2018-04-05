import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import{SSApi} from '../../Shared/serversupplyService';
import { ProductDetailPage } from '../productdetails/ProductDetails';
/*
  Generated class for the Subcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-Search',
  templateUrl: 'search.html'
})
export class SearchPage {
 cat:any={};
 Products:any[];
 queryText:string='';
  constructor(public nav: NavController, 
  public navParams: NavParams,
  public sapi:SSApi,
  public loadingCtl:LoadingController
  
  ) {}

  ionViewDidLoad() {
      //console.log(this.navParams.data)
      

    
  }
  searchProducts(event)
  {
    
    let loader=this.loadingCtl.create({
      content:'loading...'
    })
    loader.present().then(()=>{
    let queryTextLower = this.queryText.toLowerCase();
    console.log(queryTextLower);
    this.sapi.SearchProducts(queryTextLower).subscribe(data=>{
      this.Products=data;
      loader.dismiss();
    });
    })
  }
  goProductDetails($event, item)
  {
    let loader=this.loadingCtl.create(
        {
          content:'Loading...'
        }
      )
      loader.present().then(()=>{
      this.nav.push(ProductDetailPage,item);
       loader.dismiss();
      });
  }

}
