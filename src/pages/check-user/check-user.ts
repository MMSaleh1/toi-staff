import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckUserPage');
  }

  onLoginClicked(){
    this.navCtrl.push(SigninPage);    
  }
  onSignUpClicked(){
    this.navCtrl.push(SignupPage);    
    
  }
}
