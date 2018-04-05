import { Component } from '@angular/core';
import {FormBuilder,  Validators} from '@angular/forms';
import { NavController, NavParams,Events,LoadingController,ToastController } from 'ionic-angular';
import {StorageProvider} from '../../Shared/storage-provider';
import {UserProvider} from '../../Shared/userProvider';
import {validateEmail} from '../../validators/email';
import { ShiptoPage} from '../shipto/shipto';
import { User  } from '../../models/user';
import _ from 'lodash';
/*
  Generated class for the Auth page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
 auth:string;
  loginForm:any;
  userid:any={};
  user:User;
  userd:any;
  userarry:any[];
   constructor(public nav: NavController,
   public navParams: NavParams,
    public form:FormBuilder, 
                 public storage:StorageProvider, 
              public events:Events,
              public userProvider:UserProvider,
              public loadingctl:LoadingController,
              public toastController:ToastController
   ) {
     this.auth = 'login';
    this.form = form;
    this.loginForm = form.group({
        email: ["",Validators.compose([Validators.required, validateEmail])],
        password:["",Validators.required]
    });
   }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AuthPage');
  }
login() {
    // If User logins explicitly
    let loader=this.loadingctl.create({
      content:'loading...'
    })
    loader.present().then(()=>{
   
    this.userProvider.setUser(this.loginForm.value);
    this.user=this.userProvider.getUser();
    this.userProvider.authUser(this.user.email,this.user.password).subscribe(data=>{
      this.userid=data;
      this.userarry=data;
      
      console.log(this.userid);
      //console.log(this.userd.Custid);
        //console.log(JSON.parse(data['CustId']));
      if(this.userid=='')
      {
        console.log('not wokring');
        let toast = this.toastController.create({
                message: 'Wrong UserId Or Password',
                duration: 2000,
                position: 'bottom'
              });
              toast.present(); 
      }
      else
      {
        this.userd=_.last(this.userarry);
        console.log('hello');
        
       this.storage.setObject('user',this.userd.Custid);
       this.events.publish('user:logged_in');
       this.nav.pop();
      }
      loader.dismiss();
      
    },
    (err=>{

      loader.dismiss();
      console.log('code err');
    })
    );
    })

   
}
checkout()
{
  this.nav.push(ShiptoPage);
}
}
