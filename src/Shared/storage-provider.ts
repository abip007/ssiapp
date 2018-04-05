import {Injectable} from '@angular/core';
//import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider  {
 public id:any;
constructor(public storage:Storage){

  
}

getobservable(key) {
  this.storage.get("cart_id").then((val)=>{
    
    this.id=val;
    console.log("Heoll" +val);
    this.doSomething(this.id);
    
 }) 
    }
    set(key, value) {
           this.storage.set(key, value);
         }

    getObject(key) {
             let value = this.get(key)
             let returnValue;
             if(value) {
               returnValue = value;
             } else {
               returnValue = null;
             }
             return returnValue;
           }
    setObject(key, value) {
     this.storage.set(key, JSON.stringify(value));
   }   
      remove(key) {
    this.storage.remove(key);
   } 
   get(key)    
   {
    this.id=this.getobservable(key);
    
     console.log("Hll" +this.id);

   }
   doSomething = function(param)
   {
     console.log(param);
          if(param){
             //do something
          }
   }
     
}

// export class StorageProvider {
//   storage = localStorage;
//   get(key) {
//     return this.storage.getItem(key);
//   }
  
//   set(key, value) {
//     this.storage.setItem(key, value);
//   }
  
//   getObject(key) {
//     let value = this.get(key);
//     let returnValue;
//     if(value) {
//       returnValue = JSON.parse(value);
//     } else {
//       returnValue = null;
//     }
//     return returnValue;
//   }
  
//   setObject(key, value) {
//     this.storage.setItem(key, JSON.stringify(value));
//   }
  
//   remove(key) {
//     this.storage.removeItem(key);
//   }
// }

