import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Braintree, ApplePayOptions, PaymentUIOptions,PaymentUIResult } from '@ionic-native/braintree';
import { AndroidPushOptions } from 'ionic-native';
@Component({
  selector: 'BraintreePage',
  templateUrl: 'BraintreePage.html'
})
export class BraintreePage {
  
  constructor(public nav: NavController,public braintree: Braintree) {
    
  }
  
 
  BRAINTREE_TOKEN = '4z3nfr344gfqpn3z';
  

  // NOTE: Do not provide this unless you have configured your Apple Developer account
  // as well as your Braintree merchant account, otherwise the Braintree module will fail.
    appleOptions:ApplePayOptions = {
    merchantId: 'v5c5qcrn7ynnq54v',
    currency: 'USD',
    country: 'US'
  };

   paymentOptions: PaymentUIOptions = {
    amount: '14.99',
    primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
  };
  ionViewDidLoad() {
  this.braintree.initialize(this.BRAINTREE_TOKEN)
  //.then(() => this.braintree.setupApplePay(this.appleOptions))
  .then(() => this.braintree.presentDropInPaymentUI(this.paymentOptions))
  .then((result: PaymentUIResult) => {
    if (result.userCancelled) {
      console.log("User cancelled payment dialog.");
    } else {
      console.log("User successfully completed payment!");
      console.log("Payment Nonce: " + result.nonce);
      console.log("Payment Result.", result);
    }
  })
  .catch((error: string) => console.error(error));
}
  // braintree.initialize(this.BRAINTREE_TOKEN)
  // .then(() => this.braintree.setupApplePay(appleOptions))
  // .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
  // .then((result: PaymentUIResult) => {
  //   if (result.userCancelled) {
  //     console.log("User cancelled payment dialog.");
  //   } else {
  //     console.log("User successfully completed payment!");
  //     console.log("Payment Nonce: " + result.nonce);
  //     console.log("Payment Result.", result);
  //   }
  // })
  // .catch((error: string) => console.error(error));
goToSeach()
  {
        this.nav.push(SearchPage);
  }
}
