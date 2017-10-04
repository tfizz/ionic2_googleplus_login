import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GooglePlus } from '@ionic-native/google-plus';


@Injectable()
export class GoogleProvider {

  webClientId: any;

  constructor(public http: Http,private googlePlus: GooglePlus,private nativeStorage: NativeStorage) {
    // initialize webclientId gotten from google console
    this.webClientId = "469977782542-pkjkf934b9lgkee5lcsjhcdn55t4bdlc.apps.googleusercontent.com";
  }

  login(){
    // this function is used to login using google+ and will return a promise
    let promise = new Promise((resolve,reject)=>{

      let options = {
        'webClientId': this.webClientId
      };

      this.googlePlus.login(options).then(res => {
          this.nativeStorage.setItem("googlePlusToken",res.idToken);
          resolve(res);
      }).catch(err => {
        reject(err);
      })
    });

    return promise;
  }

  logout(){
    // this function is used to logout using google+ and will return a promise
    let promise = new Promise((resolve,reject)=>{

      this.googlePlus.logout().then(d=>{
        // successfully logged out. remove token
        this.nativeStorage.remove("googlePlusToken");
        resolve("done");
      }).catch(e=>{
        reject(e);
      });

    });

    return promise;
  }

}
