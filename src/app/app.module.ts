import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
/*import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';*/
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';

import { CategoryPage } from '../pages/Category/category';
import {SubcategoryPage  } from '../pages/subcategory/subcategory';
import {SScategoryPage  } from '../pages/SSCategory/SSCategory';
import {ProductsPage  } from '../pages/products/Products';
import{SSApi} from '../Shared/serversupplyService';
import{CartProvider} from '../Shared/CartProvider';
import{StorageProvider} from '../Shared/storage-provider';
import { ProductDetailPage  } from '../pages/productdetails/ProductDetails';
import { ViewCartPage } from '../pages/view-cart/view-cart';
import { UserProvider } from '../Shared/userProvider';
import { AuthPage } from '../pages/auth/auth';
import {ShiptoPage  } from '../pages/shipto/shipto';
import { BilltoPage } from '../pages/billto/billto';
import { PaymentPage } from '../pages/payment/payment';
import {  confirmOrderPage } from '../pages/confirmOrder/confirmOrder';
import {  SearchPage } from '../pages/search/search';
import { returnCustomerPage } from '../pages/returnCustomer/returnCustomer';

import { Braintree } from '@ionic-native/braintree';
import { BraintreePage } from '../pages/BraintreeTest/BraintreePage';
@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    SubcategoryPage,
    SScategoryPage,
    ProductsPage,
    ProductDetailPage,
    ViewCartPage,AuthPage,
    ShiptoPage,
    BilltoPage,
    PaymentPage,
    confirmOrderPage,
    HomePage,
    SearchPage,
    returnCustomerPage,
    BraintreePage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    SubcategoryPage,
    SScategoryPage,
    ProductsPage,
    ProductDetailPage,
    ViewCartPage,AuthPage,
    ShiptoPage,
    BilltoPage,
    PaymentPage,
    confirmOrderPage,
    HomePage,
    SearchPage,
    returnCustomerPage,
    BraintreePage


    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  SSApi,CartProvider,StorageProvider,UserProvider,Braintree
  ]
  
})
export class AppModule {}
