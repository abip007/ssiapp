import {Injectable} from '@angular/core';
import {StorageProvider} from '../Shared/storage-provider';
import { ShippingAdress  } from '../models/shippingAddress';
import { BillingAdress  } from '../models/billingAddress';
import { User  } from '../models/user';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProvider {
  market:any;
  adress:ShippingAdress;
  baddress:BillingAdress;
  zipcode:any;
  private url:any;
  userid:any;
  user:User;
  
  private baseUrl = 'http://192.168.1.16/api/';
  constructor(public storage:StorageProvider,private http:Http) {
  // this.market = this.marketProvider.getMarketCloud();
  }

  isLoggedIn() {
    let user = this.storage.getObject('user');
    if(user) {
      //console.log(user);
      return true;
    } else return false;
  }
  
  /*createUser(user) {
    let promise = new Promise((resolve, reject) => {
      console.log(user);
      this.market.users.create(user, (err, user) => {
        if(user) {
          resolve(user);
        } else {
          reject(err);
        }
      })
    });
    return promise;
  }
*/
  authUser(email,pass): Observable<any> {
    this.url=this.baseUrl +'Login/GetLogin?email='+email +'&password='+pass;
    console.log(this.url);
     return this.http.get(this.url)
            .map(response => {
                this.userid = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.userid;
            });
  }

  logout() {
    this.storage.remove('user');
   
  }

getCurrentUser(id) {
  this.url=this.baseUrl +'Customer/getrecordByid?id='+id;
    console.log(this.url);
     return this.http.get(this.url)
            .map(response => {
                this.userid = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.userid;
            });
  }

  /*let promise = new Promise((resolve, reject) => {
      this.market.users.getCurrent((err, user) => {
        if(user) {
          resolve(user);
        } else {
          console.log(err);
          reject(err);
        }
      })
    });
    return promise;*/
  
  
 getAddress() {
   /*let promise = new Promise((resolve, reject) => {
      this.market.addresses.list({},(err, address) => {
        console.log(err,address)
        if(address) {
          resolve(address);
        } else {
          reject(err);
        }
      })
   });
   return promise;*/
   return this.adress;
 }
 getZipCode(user)
 {
   this.zipcode;
 }
 
 createAddress(address,zipcode) {
   /*let promise = new Promise((resolve, reject) => {
     this.market.addresses.create(address, (err, address) => {
       if(address) {
         resolve(address);
       } else {
         reject(err);
       }
     });
   })
   
   return promise;*/
   this.adress=address;
   this.zipcode=zipcode;
 }
 createABillddress(address) {
   /*let promise = new Promise((resolve, reject) => {
     this.market.addresses.create(address, (err, address) => {
       if(address) {
         resolve(address);
       } else {
         reject(err);
       }
     });
   })
   
   return promise;*/
   this.baddress=address;
   
 }
 setUser(user)
 {
  this.user=user;
 }
 getUser()
 {
   return this.user;
 }
 getbAddress()
 {
   return this.baddress;
 }
 
}

