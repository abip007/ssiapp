import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{UserProvider} from '../../Shared/userProvider'
import {FormBuilder,  Validators} from '@angular/forms';
import { PaymentPage } from '../payment/payment';

import { ShippingAdress  } from '../../models/shippingAddress';
/*
  Generated class for the Billto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-billto',
  templateUrl: 'billto.html'
})
export class BilltoPage {
addressForm:any;
address:ShippingAdress;
oaddress={};
sameBilling=false;
 bzip="";
 bcity="";
 bstate="";
 bco="";
 bname="";
 badd1="";
 badd2="";
 phone="";
 pass="";
 fax="";
 email="";
  constructor(public nav: NavController,
  public navParams: NavParams,
  public userProvider:UserProvider,
  public form:FormBuilder

  ) {

    this.addressForm = form.group({
      bco: ["", Validators.required],
      bname: ["",Validators.required],
      bcity:["", Validators.required],
      bstate: ["", Validators.required],
      bzip: ["", Validators.required],
      badd1:["", Validators.required],
      badd2:["", Validators.required],
      email:["", Validators.required],
      pass:["", Validators.required],
      phone:["", Validators.required],
      fax:["", Validators.required]
      
    });    
  }

  ionViewDidLoad() {
   //console.log(this.userProvider.getAddress());
   
   
  //this.address.bco=this.oaddress.sco;
  }
processOrder() {
   console.log(this.addressForm.value);
   this.userProvider.createABillddress(this.addressForm.value);
   //this.userProvider.createAddress(this.addressForm.value);
   //console.log(this.userProvider.getAddress());
  this.nav.push(PaymentPage);
 }
 BillingChanged()
 {

if (this.sameBilling===true)
   {
     this.address=this.userProvider.getAddress();
     this.bco=this.address.sco;
     this.bname=this.address.Sname;
     this.badd1=this.address.Sadd1;
     this.badd2=this.address.Sadd2;
     this.bstate=this.address.sstate;
     this.bzip=this.address.zipcode;
     this.bcity=this.address.scity;
     
   }
   else
   {
this.bco="";
     this.bname="";
     this.badd1="";
     this.badd2="";
     this.bstate="";
     this.bzip="";
     this.bcity="";

   }
 }
}
