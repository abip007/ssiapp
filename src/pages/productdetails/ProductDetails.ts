import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import{SSApi} from '../../Shared/serversupplyService';
import{CartProvider} from '../../Shared/CartProvider';
import _ from 'lodash';
import { ViewCartPage } from '../view-cart/view-cart';
import { SearchPage } from '../search/search';
import { Events } from 'ionic-angular';
/*
  Generated class for the Subcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ProductDetails',
  templateUrl: 'ProductDetails.html'
})
export class ProductDetailPage {
 id:any={};
 public products: any [];
 public product :any={};
 quantity:number=1;
 errorMessage:string='Loading..'
  constructor(public nav: NavController, 
  public navParams: NavParams,
  public sapi:SSApi,
  public CartProvider:CartProvider,
  public loadingController:LoadingController,
  public events:Events

  
  ) {}

  ionViewDidLoad() {
      //console.log(this.navParams.data)
    this.id=this.navParams.data;
    this.sapi.getProductbyId(this.navParams.data.itemid).subscribe(data=>{
      this.products=data;
     this.product = _.find(this.products, { 'itemid': this.id.itemid });
     //console.log(this.product);
    },
    ((error)=>{
      this.errorMessage='Problem with service';
    })
  )}
    
  
  AddtoCart(itemid,price,cost,weight,pnum,description)
  {
    //console.log("wt"+weight);
 let loader = this.loadingController.create({
      content: 'Adding to Cart'
    });
   loader.present().then(() => {
    this.CartProvider.addToCart(itemid,this.quantity,weight,cost,price,pnum,description);
    this.events.publish('cart:changed');
    loader.dismiss();
     });
    
  }
  openCart() {
    this.nav.push(ViewCartPage);
  }
   goToSeach()
  {
        this.nav.push(SearchPage);
  }
}
