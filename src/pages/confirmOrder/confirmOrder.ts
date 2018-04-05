import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-confirmOrder',
  templateUrl: 'confirmOrder.html'
})
export class confirmOrderPage {
 orderid:any;
 
  constructor(public nav: NavController, 
  public navParams: NavParams,
 
 
  
  ) {}

  ionViewDidLoad() {
      console.log(this.navParams.data)
   
    this.orderid=this.navParams.data;
    
    
  }
    
  }