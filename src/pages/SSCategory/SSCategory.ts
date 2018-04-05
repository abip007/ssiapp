import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import{SSApi} from '../../Shared/serversupplyService';
import { ProductsPage } from '../products/Products';
import { SearchPage } from '../search/search';
/*
  Generated class for the Subcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subcategory',
  templateUrl: 'SScategory.html'
})
export class SScategoryPage {
 cat:any={};
 SScategory:any[];
 statusMessage:string='Data Loading...';
  constructor(public nav: NavController, 
  public navParams: NavParams,
  public sapi:SSApi,
  public loadingctl:LoadingController
  
  ) {}

  ionViewDidLoad() {
      //console.log(this.navParams.data)
    let loader=this.loadingctl.create({
      content:'loading...'
    })
    loader.present().then(()=>{
    this.cat=this.navParams.data;
    
    this.sapi.getSSubCategory(this.navParams.data.CategoryId,this.navParams.data.SubCatid)
    .subscribe((data)=>
    {
      this.SScategory=data;
      loader.dismiss();
    },
      (error)=>{
       // console.error(error);
        this.statusMessage='Problem with service . Please try again after some times';
        loader.dismiss();
      }
    );
    })

    
  }
   goToSeach()
  {
        this.nav.push(SearchPage);
  }
 
  goProducts($event, item)
  {
      this.nav.push(ProductsPage,item);
  }

}
