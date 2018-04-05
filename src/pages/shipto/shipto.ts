import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder,  Validators} from '@angular/forms';
// import {validateEmail} from '../../validators/email';
import {UserProvider } from '../../Shared/userProvider'
import { BilltoPage } from '../billto/billto';
import{SSApi} from '../../Shared/serversupplyService';
import { ShippingAdress  } from '../../models/shippingAddress';

/*
  Generated class for the Shipto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shipto',
  templateUrl: 'shipto.html'
})
export class ShiptoPage {
address:ShippingAdress;
  items:any;
  addressForm:any;
  iaddress:ShippingAdress;
 zipcode="";
 scity="";
 sstate="";
 sco="";
 Sname="";
 Sadd1="";
 Sadd2="";

  constructor(public nav: NavController, 
  public navParams: NavParams,
  public form:FormBuilder,
  public userProvider:UserProvider,
  public sapi:SSApi
   ) 
   {
this.iaddress=this.userProvider.getAddress();
console.log(this.iaddress);
if(this.iaddress!==undefined)
{
  this.sco=this.iaddress.sco;
  this.Sname=this.iaddress.Sname;
  this.zipcode=this.iaddress.zipcode;
  this.sstate=this.iaddress.sstate;
  this.Sadd1=this.iaddress.Sadd1;
  this.Sadd2=this.iaddress.Sadd2;
  this.scity=this.iaddress.scity;
  
  
}
this.addressForm = form.group({
      sco: ["", Validators.required],
      Sname: ["",Validators.required],
      scity:["", Validators.required],
      sstate: ["", Validators.required],
      zipcode: ["", Validators.required],
      Sadd1:["", Validators.required],
      Sadd2:["", Validators.required]
    }); 
        
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ShiptoPage');
   // this.address=this.userProvider.getAddress();
  }
 processOrder() {
   console.log(this.addressForm.value);
   this.userProvider.createAddress(this.addressForm.value,this.zipcode);
  
   //console.log(this.userProvider.getAddress());
   this.nav.push(BilltoPage);
 }
 getZipcode(event)
 {
  //console.log(zipcode.value);
  let newvalue=event.target.value;
  console.log(newvalue);
this.sapi.GetRecordByZipId(newvalue).subscribe(data=>{
      this.address=data;
      console.log(this.address)
      //this.addressForm.controls['scity'].value=(data[0].city);
     // console.log(data[0].city);
 if(data!="")
 {
  this.sstate=(data[0].state);
  this.scity=(data[0].city);
     console.log(data);
 }
 else
 {
this.sstate="";
  this.scity="";
 }
    });
 }
 
}
