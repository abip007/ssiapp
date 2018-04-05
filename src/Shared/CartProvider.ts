import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {StorageProvider} from '../Shared/storage-provider';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage'
declare let BraintreePlugin:any;

@Injectable()
export class CartProvider {
  cartID:any;
  market:any;
  private baseUrl = 'http://192.168.1.16/api/';
  private url:any;
  private cart:any;
   private orderid:any;
  constructor(public storage: StorageProvider, public http:Http,
    public events: Events,
    public istorage:Storage
  ) {
    //this.market = this.marketProvider.getMarketCloud();
    // let local_cart_id = this.storage.get('cart_id');
    
    // if(local_cart_id) {
    //   this.cartID = local_cart_id;
    // }
    
  }

  setCartID(value) {
    console.log('set cart id', value);
    this.cartID = value;
    if(value) {
      this.storage.set('cart_id', value);
    } else {
      this.storage.remove('cart_id');
    }
  } 

//   intializePayments() {
//     let marketcloud_id = this.marketProvider.getMarketCloud().public;
//     console.log(marketcloud_id);
//     let headers = new Headers({'Authorization': marketcloud_id});
//     let promise = new Promise((res, rej)=> {
//       this.market.payments.braintree.createClientToken((err, data) => {
//         if(err) {
//           rej(err);
//         } else {
//           let token = data.clientToken;
//           BraintreePlugin.initialize(token, () => res('done'), (error) => rej(error));
//           console.log(data);
//           res(data);
//         }
//       });
//     });
//     return promise;
//   }
  
  addToCart(itemid, qty,weight,cost, price,itemname,descr) {
    console.log(this.isCartExist());
    
    //let promise = new Promise((resolve, reject) => {
      // if Cart not already exists
      if(!this.isCartExist()) {
          var cartitem=[{'pid' : itemid, 'qty': qty,'weight':weight,'cost':cost,'sell':price,'partnum':itemname,'sdescr':descr}];
          var cart = {
            "isOrder": "N"
        };
           this.url =this.baseUrl +"Cart/Post";
           var data={cart:cart,cartitem:cartitem};
           console.log(data);
           this.http.post(this.url,data)
           .subscribe(item=>
           {
              console.log(item);
              this.setCartID(JSON.parse(item['_body']));
              this.events.publish('cart:added');
               //this.setCartID(cart.cartid);
    //         resolve(cart);
           },
           error=>{
               console.log("error");
           }
           )
    //     this.market.carts.create({
    //       cart:[{'pid' : itemid, 'qty': qty,'weight':weight,'sell':price,'partnum':itemname,'sdescr':descr}]
    //     }, (err, cart) => {
    //       if(err) {
    //         reject(err);
    //       } else {
    //         this.setCartID(cart.cartid);
    //         resolve(cart);
    //       }
    //     });
       } 
       else
        {  // if Cart exists
          this.url =this.baseUrl +"Cart/AddCartId";
          var cartnewitem=[{'pid' : itemid, 'qty': qty,'weight':weight,'cost':cost,'sell':price,'partnum':itemname,'sdescr':descr,'cartid':this.cartID}];
           var newdata={cartitem:cartnewitem};
           console.log(newdata);
           this.http.post(this.url,newdata)
           .subscribe(item=>
           {
              console.log(item);
              this.events.publish('cart:changed');
               //this.setCartID(cart.cartid);
    //         resolve(cart);
           },
           error=>{
               console.log("error");
           });
       }
    //});
    
    //return promise;
  }
  
  isCartExist() {
    if(this.cartID) {
      console.log(this.cartID);
      return true;
    } else {
      return false
    };
  }
  
  getCartContents(cartid) {
    
    
      // if(this.cartID !== undefined) 
      // {
         this.url=this.baseUrl +"cart/GetCart/?cartid="+cartid 
        console.log(this.url);
        return this.http.get(this.url)
            .map(response => {
                this.cart = response.json();
                return this.cart;
               // this.currentTourney = this.tourneyData[tourneyId];
               
            });

      //  }
      //  else
      //  {
      //    console.log('no item')
      //   return this.cart;
      //  }


   
        
      
  }
  /*getCartContents() {
    let promise = new Promise((resolve, reject) => {
      console.log(this.cartID);
      this.url=this.baseUrl +"cart/GetCart/?cartid="+this.cartID 
      if(this.cartID !== undefined) {
         console.log(this.url);
        this.http.get(this.url, function(err, cart) {
          if(cart) {
            resolve(cart);
          } else { 
            reject(err);
          }
       });
        
      } else {
        reject("no cart created yet");
      }
      
    });
    return promise;
  }*/
  
  updateCart(lid,qty) {
    this.url =this.baseUrl +"Cart/Updatecart/?lid="+lid +"&qty="+qty;
         //var updqty=[{'lid' : lid, 'qty': qty}];
           var newdata={'lid' : lid, 'qty': qty};
           this.http.post(this.url,newdata)
           .subscribe(item=>
           {
              console.log(item);
              
               //this.setCartID(cart.cartid);
    //         resolve(cart);
           },
           error=>{
               console.log("error");
           });
  }
  
  removeItem(lid) {
    this.url =this.baseUrl +"Cart/DeleteCartlind/?id="+lid;
                 
            return this.http.get(this.url,lid)
            .map(response => {
                this.cart = response.json();
                 this.events.publish('cart:changed');
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.cart;
            });
  }
  
  createOrder(saddress,baddress,payment,stotal,taxes,shipcost) {
    this.url =this.baseUrl +"Orders/CreateOrder";
    var ordertotal={'SubTotal':stotal,'Taxes':taxes,'ShipCost':shipcost};
    var cartid={'cartid':this.cartID};
    var shipping_address= saddress;
    var billing_address=baddress;
    var  paymentdata=payment;
    var order={shipping_address : shipping_address, billing_address: billing_address,paymentdata:paymentdata,cartid:cartid,ordertotal:ordertotal};
          console.log(order);
         return  this.http.post(this.url,order)
           .map(item=>
           {
              console.log(item);
              //orderid=JSON.parse(item['_body']);
              //orderid=JSON.parse(item['_body']);
              this.orderid=JSON.parse(item['_body']);
              return this.orderid;
               //this.setCartID(cart.cartid);
    //         resolve(cart);
           },
           error=>{
               console.log("error");
           });

  }
  createRcOrder(payment,stotal,taxes,shipcost) {
    this.url =this.baseUrl +"Orders/CreateRcOrder";
    var ordertotal={'SubTotal':stotal,'Taxes':taxes,'ShipCost':shipcost};
    var cartid={'cartid':this.cartID};
    
    var  paymentdata=payment;
    var order={paymentdata:paymentdata,cartid:cartid,ordertotal:ordertotal};
          console.log(order);
         return  this.http.post(this.url,order)
           .map(item=>
           {
              console.log(item);
              //orderid=JSON.parse(item['_body']);
              //orderid=JSON.parse(item['_body']);
              this.orderid=JSON.parse(item['_body']);
              return this.orderid;
               //this.setCartID(cart.cartid);
    //         resolve(cart);
           },
           error=>{
               console.log("error");
           });

  }

  getPayment(amount, user) {
    var options = {
      cancelText: "Cancel",
      title: "Purchase",
      ctaText: "Select Payment Method",
      amount: "$" + amount.toString(),
      primaryDescription: "Your Item",
      secondaryDescription :"Free shipping!"
    };
    var promise = new Promise((res, rej) => {
      BraintreePlugin.presentDropInPaymentUI(options, function (result) {
        if (result.userCancelled) {
            rej('user cancelled');
        }
        else {
           console.log(result);
           res(result);
        }
      });
    });
    return promise; 
  }
  
  // getPayment(amount,user) {
  //   let options = {
  //      description: 'Order Payment Successful',
  //       currency: 'INR',
  //       key: 'rzp_test_cVALY8lcJx6VZ5',
  //       amount: amount.toString(),
  //       name: name,
  //       prefill: {email: user.email, name:user.name},
  //       theme: {color: '#F37254'}
  //   };
    
  //   var promise = new Promise((resolve, reject) => {
  //      let success, error;
  //      success = (payment_id) => {
  //        resolve(payment_id);
  //      };
  //      error = (error) => {
  //        reject(error);
  //      };
  //      RazorpayCheckout.open(options,success, error);
  //   });
    
  //   return promise;   
  // }

  createPayment(order_id, nonce) {
    let promise = new Promise((res, rej) => {
      this.market.payments.create({
        method: 'Braintree',
        order_id: order_id,
        nonce: nonce
      }, (err, result) => {
        if(err) {
          rej(err);
        } else {
          res(result);
          this.setCartID(undefined);
        }
      });
    });

    return promise;
  }
}
