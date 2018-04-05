import { Component } from '@angular/core';
import {UserProvider} from '../../Shared/userProvider';
import { NavController, NavParams,ToastController } from 'ionic-angular';
//import {StorageProvider} from '../../Shared/storage-provider';
import {FormBuilder,  Validators} from '@angular/forms';
import{CartProvider} from '../../Shared/CartProvider';
import{SSApi} from '../../Shared/serversupplyService';
import _ from 'lodash';
import {  confirmOrderPage } from '../confirmOrder/confirmOrder';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-returnCustomer',
  templateUrl: 'returnCustomer.html'
})
export class returnCustomerPage {
  userData: any[];
  billto:any[];
  shipto:any[];
 
  payinfo:any[];
  addressForm:any;
  isCreditCard:boolean=false;
  ceev=""
  shiptypeid:string="5";
  cart:any[];
isExist:Boolean;
items:Array<any>;
total:number = null;
tax:number=0;
gtotal:number=0;
totalweight:number=0;
tax_rate:number=0;
shipvalue:number=0;
sh:any;
terms:any;
termsid:any;
orderid:any;
  constructor(public navCtrl: NavController,
   public nav: NavParams,
   public userProvider:UserProvider,
  // public storage:StorageProvider,
    public cartProvider:CartProvider,
     public sapi:SSApi,
   public form:FormBuilder,
    public toastController:ToastController,
    public storage:Storage

   ) {
    this.payinfo=this.nav.data.pay;
    let p=_.last(this.nav.data.pay);
    console.log(p.termsid);
    this.termsid=p.termsid;
     if(p.termsid==1)
        {
          this.terms="Credit Card"
        }
        if(p.termsid==21)
        {
          this.terms="Debit Card"
        }
        if(p.termsid==10)
        {
          this.terms="PayPal"
        }
        if(p.termsid==16)
        {
          this.terms="Other"
        }
        if(p.termsid==2)
        {
          this.terms="Net 30"
        }
        console.log(this.terms);
      if(p.termsid==1||p.termsid==21)
      {
        this.isCreditCard=true;
        this.addressForm = this.form.group({
        shiptypeid:["", Validators.required],
        ceev:["",Validators.required],
        termsid:[""],
        shipid:[""],
        custid:[""],
        payid:[""]
        });
      }
      else
      {
        this.isCreditCard=false;
        this.addressForm = this.form.group({
       shiptypeid:["", Validators.required],
       termsid:[""],
       shipid:[""],
       custid:[""],
       payid:[""]
      
        });
       
      }
 

    
  }
 /* ngOnInit()
  {
    console.log('rustom '+this.isCreditCard);
     if (this.isCreditCard)
     {
        
        this.addressForm = this.form.group({
      termsid: ["", Validators.required],
      shiptypeid:["", Validators.required],
      ceev:[""],
      
        });
        console.log('rustom');
     }
     else
     {
        
        
     }
   
     
  }*/
  ionViewDidLoad()
   {
   
    //console.log(this.nav.data);
    this.billto=this.nav.data.billto;
    this.shipto=this.nav.data.shipto;
    this.payinfo=this.nav.data.pay;
    let adress=_.last(this.nav.data.shipto);
    let szipcode=adress.zipcode;
    console.log(this.billto);
    console.log(this.payinfo);
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
     
     this.sapi.GetRecordByZipId(szipcode).subscribe(data=>{
      //this.address=data;
      //console.log(this.address)
      //this.addressForm.controls['scity'].value=(data[0].city);
     //console.log(data);
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
 processOrder()
  {
    console.log(this.addressForm.value,this.total,this.tax,this.shipvalue);
    this.cartProvider.createRcOrder(this.addressForm.value,this.total,this.tax,this.shipvalue)
    .subscribe(data=>
   {
      this.orderid=data;
      console.log(this.orderid);

  

   
  
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




  /*temTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }*/

