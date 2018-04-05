import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{CartProvider} from '../../Shared/CartProvider';
import { UserProvider  } from '../../Shared/userProvider';
import {AuthPage  } from '../auth/auth';
import {returnCustomerPage  } from '../returnCustomer/returnCustomer';
//import {StorageProvider} from '../../Shared/storage-provider';
import { Storage } from '@ionic/storage'
import { Events } from 'ionic-angular';
//import _ from 'lodash';
/*
  Generated class for the ViewCart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-cart',
  templateUrl: 'view-cart.html'
})
export class ViewCartPage {
cart:any[];
isExist:Boolean;
items:Array<any>;
total:number = null;
billto:any[];
shipto:any[];
payinfo:any;
userData: any[];

isCreditCard:boolean=false;
  constructor(public nav: NavController,
   public navParams: NavParams,
   public cartProvider:CartProvider,
   public userProvider:UserProvider,
   
   public storage:Storage,
   public events:Events
   ) {}

  ionViewDidLoad() {
    
this.storage.get('cart_id').then((val=>{
let cartID =val;
if (cartID)
 {
     this.cartProvider.getCartContents(cartID).subscribe(data=>{
      this.items=data;
      console.log(this.items);
      if(this.items.length===0)
      {
        this.reset();
      }
      else
      {
     this.total = this.getTotal(this.items);
      }
     //console.log(this.total);
    })
  }
  else {
    this.reset();
  }
  }))
}
  checkout() {
  
    //this.nav.push(OrderPage, {items: this.items});
    
    let user = this.storage.get('user').then(val=>{
      user=val;
      console.log(user)
      if(user)
      {
      this.userProvider.getCurrentUser(user).subscribe(data=>{
        this.userData=data;
       // console.log(" fdsf "+this.userData);
        //this.userarry=data;
        // this.billto=data.billto;
        // this.shipto=data.shipto;
        //  //console.log(this.billto);
        
        // //this.shipto=_.last(this.shiptoa);
        // this.payinfo=data.pay;
        // let p=_.last(data.pay)
        //  console.log(p.termsid);
        // if (p.termsid==1 || p.termsid==21)
        // {
        //  this.isCreditCard=true;
         
        // }
        // else
        // {
        //  this.isCreditCard=false;
        // }
        //console.log(user);
     
      this.nav.push(returnCustomerPage,this.userData);
      
      
    })
    
  }
  else {
    this.nav.push(AuthPage);
      }
    });
    
    
    
   }
  
   
   
  
  changeQuantity(lid,quantity,index) {
    this.items[index].qty = quantity;
    this.cartProvider.updateCart(lid,quantity);
     this.total = this.getTotal(this.items);
   
  }
  removeItem(id) {
    this.cartProvider.removeItem(id)
    .subscribe(cart => {
      this.items = cart;
      this.events.publish('cart:changed');
      //this.items = cart.items;
       if(this.items.length===0)
      {
        this.reset();
      }
      else
      {
     this.total = this.getTotal(this.items);
      }
      //this.total = this.getTotal(this.items);
      //console.log(this.cart);
    })
   
  }
getTotal(items?) {
    if(items) {
      let total = items.map((x) => {
        return x.sell * x.qty;
      })
      .reduce((pre, curr) =>{
         return pre + curr;
     });  
     return total;
    } else {
      return null;
    }   
  }
  reset() {
    this.cart = null;
    this.items = null;
    this.total = null;
  }
}
