import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import{CartProvider} from '../../Shared/CartProvider';
import{SSApi} from '../../Shared/serversupplyService';
import { ShippingAdress  } from '../../models/shippingAddress';
import { BillingAdress  } from '../../models/billingAddress';
import {UserProvider } from '../../Shared/userProvider'
import {FormBuilder,  Validators} from '@angular/forms';
import {  confirmOrderPage } from '../confirmOrder/confirmOrder';
import { Storage } from '@ionic/storage'
/*
  Generated class for the Payment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  creditcard:any=true;
  cart:any[];
isExist:Boolean;
items:Array<any>;
total:number = null;
tax:number=0;
gtotal:number=0;
address:any={};
saddress:ShippingAdress;
baddress:BillingAdress;
shiptypeid:string="5";
termsid:string="1";
totalweight:number=0;
tax_rate:number=0;
shipvalue:number=0;
sh:any;
cexyr="2017"
years=[];
months=[];
addressForm:any;
cname=""
cnum=""
ceev=""
cexmo="01"
orderid:any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
   public cartProvider:CartProvider,
   public sapi:SSApi,
   public userProvider:UserProvider,
   public form:FormBuilder,
   public toastController:ToastController,
   public storage:Storage
   ) {
    
    this.addressForm = form.group({
      termsid: ["", Validators.required],
      shiptypeid:["", Validators.required],
      cname: [""],
      cnum: [""],
      ceev:[""],
      cexyr:[""],
      cexmo:[""],
    });
    
   }

  ionViewDidLoad() {
    
 var currentYear = (new Date()).getFullYear();
    for(var i = 0; i <= 7; i++){
     this.years.push(currentYear+i);
    }
    for(var i = 1; i <=12; i++){
     if (i<10)
     {
     this.months.push("0"+i);
    }
    else
    {
       this.months.push(i);
    }
    }
    
    this.isExist = this.cartProvider.isCartExist();
    if(this.isExist) {
      //  this.cartProvider.getCartContents()
      // .subscribe((cartContent:any) => {
      //   this.cart = cartContent;
      //   this.items = cartContent.items;
      //   this.total = this.getTotal(this.items);
       // console.log(this.items);
       this.storage.get('cart_id').then((val=>{
        let cartID =val;
       this.cartProvider.getCartContents(cartID).subscribe(data=>{
      this.items=data;
     this.total = this.getTotal(this.items);
     this.totalweight=this.getTotalWeight(this.items);
     this.saddress=this.userProvider.getAddress();
     this.sapi.GetRecordByZipId(this.saddress.zipcode).subscribe(data=>{
      this.address=data;
      console.log(this.address)
      //this.addressForm.controls['scity'].value=(data[0].city);
     // console.log(data[0].city);
      if(data!="")
        {
          this.tax=Math.round(((data[0].tax_rate)*this.total)*100)/100;
          this.gtotal=Math.round((this.total+this.tax)*100)/100;
          this.tax_rate=data[0].tax_rate;
         
        }
        else
        {
        this.tax=0
        }
    });
     
     //console.log(this.total);
    })
  }))
  }
   else {
      this.reset();
    }
  }
  PaymentChange(event)
  {
    if(event==21 ||event==1)
    {
      this.creditcard=true;
    }
    else
    {
      this.creditcard=false;
      //this.cname="na"
      //this.ccnum="na"
      //this.cev="na"

      console.log(this.addressForm.valid);
      
    }
  
  }
  processOrder() {
    this.baddress=this.userProvider.getbAddress();
   console.log(this.addressForm.value);
   console.log(this.saddress);
   this.cartProvider.createOrder(this.saddress,this.baddress,this.addressForm.value,this.total,this.tax,this.shipvalue)
   .subscribe(data=>
   {
      this.orderid=data;
      console.log(this.orderid);

  this.saddress.sco='';
  this.saddress.Sname='';
  this.saddress.scity='';
  this.saddress.Sadd1='';
  this.saddress.Sadd2='';
  this.saddress.sstate='';
  this.saddress.zipcode='';

   this.userProvider.createAddress(this.saddress,'');
  
   //console.log(this.userProvider.getAddress());
  // this.nav.push(BilltoPage);
  this.cartProvider.setCartID(null);
  
  let toast = this.toastController.create({
                message: 'Order Successfull',
                duration: 2000,
                position: 'bottom'
              });
              toast.present(); 
              console.log(this.orderid +' hello');
              this.navCtrl.push(confirmOrderPage,this.orderid)
   })
 }
  shiptypeChange(event)
  {
    this.sapi.GetShipingById(event,this.tax_rate,this.total,this.totalweight).subscribe(item=>{
      this.sh=item;
      
    console.log(item);
      //console.log(currentYear);
      if(item!="")
      {
       this.shipvalue=Math.round(item.ship*100)/100;
       this.gtotal= Math.round(item.grandtotal*100)/100;
        this.tax=Math.round(item.taxes *100)/100;
      }
    });
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
  getTotalWeight(items?)
  {
    if(items) {
      let weight = items.map((x) => {
        return x.weight;
      })
      .reduce((pre, curr) =>{
         return pre + curr;
     });  
     return weight;
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
