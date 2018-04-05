import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SSApi {
private baseUrl = 'http://192.168.1.16/api/';
    private SCategoryData = {};
     private SSCategoryData = {};
    private url:any;
    private Products:any={};
    private zip:any={};
    public shipvalue:any={};
    constructor(public http: Http) { }
    getSubCategory(catid): Observable<any>{
        this.url=this.baseUrl +"scat/GetScat?catid="+catid
        
        return this.http.get(this.url)
            .map(response => {
                this.SCategoryData = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.SCategoryData;
            });
    }
    getSSubCategory(catid,scatid): Observable<any>{
        this.url=this.baseUrl +"sscat/GetScat?catid="+catid + "&scatid="+scatid
        
        return this.http.get(this.url)
            .map(response => {
                this.SSCategoryData = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.SSCategoryData;
            })
            .catch(this.handleError);
    }
    getProductsbyCatScatSScat(catid,scatid,sscatid): Observable<any>{
        this.url=this.baseUrl +"Products/GetProductbyCatSCatSScat?catid="+catid + "&scatid="+scatid +"&sscatid="+sscatid
        //console.log(this.url);
        return this.http.get(this.url)
            .map((response:Response) => {
                this.Products = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.Products;
            })
            .catch(this.handleError);
    }
    handleError(error:Response)
    {
        console.error(error);
       return Observable.throw(error);
    }
    getProductbyId(id): Observable<any>{
        this.url=this.baseUrl +"Products/GetProducts/"+id 
        //console.log(this.url);
        return this.http.get(this.url)
            .map(response => {
                this.Products = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.Products;
            });
    }
    GetRecordByZipId(id): Observable<any>{
        this.url=this.baseUrl +"Checkout/GetRecordById?id="+id 
        //console.log(this.url);
        return this.http.get(this.url)
            .map(response => {
                this.zip = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.zip;
            });
    }
    GetShipingById(id,t_rate,cartvalue,totalweight): Observable<any>{
        this.url=this.baseUrl +"Checkout/GetShipingById?id="+id + "&t_rate="+t_rate +"&cartvalue="+cartvalue +"&totalweight="+totalweight
        console.log(this.url);
        return this.http.get(this.url)
            .map(response => {
                this.shipvalue = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.shipvalue;
            });
    }

    //Products/FindProducts?q

    SearchProducts(q): Observable<any>{
        this.url=this.baseUrl +"Products/FindProducts?q="+q
        //console.log(this.url);
        return this.http.get(this.url)
            .map(response => {
                this.Products = response.json();
               // this.currentTourney = this.tourneyData[tourneyId];
                return this.Products;
            });
    }
    
}
