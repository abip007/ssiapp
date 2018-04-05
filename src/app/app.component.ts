import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
/*import { Page2 } from '../pages/page2/page2';*/
import { CategoryPage } from '../pages/Category/category';
import { BraintreePage } from '../pages/BraintreeTest/BraintreePage';
import { ViewCartPage } from '../pages/view-cart/view-cart';
import { CartProvider} from '../Shared/CartProvider';
//import {StorageProvider} from '../Shared/storage-provider';
import {UserProvider} from '../Shared/userProvider';
//import { SubcategoryPage  } from '../pages/subcategory/subcategory';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  items:Array<any>;
  count:number;
  isLoggedIn = false;
  user:any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
   public events: Events,
  public cartprovider:CartProvider,
  public userProvider:UserProvider,
  public storage:Storage
   ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    //this.pages = [
     /* { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },*/
     // { title: 'Category', component: CategoryPage },
     // {title:'View Cart',component:ViewCartPage}
      

      
   // ];
    this.events.subscribe('user:logged_out', () => {
       this.isLoggedIn = false;
    });
    
    this.events.subscribe('user:logged_in', () => {
      this.isLoggedIn = true;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      
      this.storage.get('user').then((val)=>{
        this.user= val;
        if(this.user)
      {
        this.isLoggedIn = true;
      }
       });
      
      this.cartItems();
      
      this.events.subscribe('cart:changed', () => this.cartItems());
      
      Splashscreen.hide();
    });
  }
  cartItems()
  {
    this.storage.get('cart_id').then((val=>{
      let cartID =val;
    if (cartID)
    {

     this.cartprovider.getCartContents(cartID).subscribe(data=>{
      this.items=data;
      this.count=this.items.length;
     })
    }
    }))
  }
  logout() {
    this.userProvider.logout();
    this.events.publish('user:logged_out', {});
  }
  goHome() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   this.nav.push(HomePage);
  }
  goCategory()
  {
    this.nav.push(CategoryPage);
  }
  goBrain()
  {
    this.nav.push(BraintreePage);
  }
  
  ViewCart()
  {
    this.nav.push(ViewCartPage);
  }
}
