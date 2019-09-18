import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the CheckUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-user',
  templateUrl: 'check-user.html',
})
export class CheckUserPage {
  lang;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public storage: Storage
    , private translate: TranslateService
    , private platform: Platform) {
      this.initLang();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckUserPage');
  }

  onLoginClicked(){
    this.navCtrl.push('SigninPage');    
  }
  onSignUpClicked(){
    this.navCtrl.push('EnterCodePage');    
    
  }

  
  changeLang(type) {
    if (type == 'ar') {
      this.translate.use("ar");
      this.platform.setDir("rtl", true);
      this.storage.set('language', 'ar');
      this.lang  = 'ar';
    }
    else {
      this.translate.use("en");
      this.platform.setDir("ltr", true);
      this.storage.set('language', 'en')
      this.lang  = 'en';
    }
  }
  
  initLang() {
    this.storage.get("language").then(data => {
      console.log(data)
      if (data) {
        this.lang = data;
      }
      else {
        this.lang = 'en';
        console.log(this.lang)
      }
    })
  }
}
