import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import{SSApi} from '../../Shared/serversupplyService';
import { ProductDetailPage } from '../productdetails/ProductDetails';
import _ from 'lodash';
/*
  Generated class for the Subcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-Products',
  templateUrl: 'Products.html'
})
export class ProductsPage {
 cat:any={};
 Products:any[];
 queryText:string='';
 oProducts:any[];
 errorMessage:string='Loading..';
  constructor(public nav: NavController, 
  public navParams: NavParams,
  public sapi:SSApi,
  public loadingCtl:LoadingController
  
  ) {}

  ionViewDidLoad() {
      //console.log(this.navParams.data)
      let loader=this.loadingCtl.create(
        {
          content:'Loading...'
        }
      )
      loader.present().then(()=>{
    this.cat=this.navParams.data;
    this.sapi.getProductsbyCatScatSScat(this.navParams.data.CategoryId,this.navParams.data.SubCatid,this.navParams.data.ssCategoryId).subscribe(data=>{
      this.Products=data;
      this.oProducts=data;
       //console.log(this.Products)
       loader.dismiss();
    },
    ((error)=>{
      console.error(error);
      this.errorMessage='Problem with service';
      loader.dismiss();
    })
  );
    })

    
  }
  goProductDetails($event, item)
  {
    let loader=this.loadingCtl.create(
        {
          content:'Loading...'
        }
      )
      loader.present().then(()=>{
      this.nav.push(ProductDetailPage,item);
       loader.dismiss();
      });
  }
  updateProducts()
  {
    /*let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.Products, td => {
      let teams = _.filter(td.description, t => (<any>t).description.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.Products = filteredTeams;*/
    let queryTextLower = this.queryText.toLowerCase();
  let filterproducts=  _.filter(this.oProducts, function(item){
     return  item.description.toLowerCase().includes(queryTextLower) ||item.pnum.toLowerCase().includes(queryTextLower)
     
      
});
filterproducts= _.orderBy(filterproducts,['price'],['desc']);
console.log(filterproducts)
this.Products=filterproducts;
  }

}
