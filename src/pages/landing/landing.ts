import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';
import { UserProvider, User } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Database } from '../../providers/database/database';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  db :Database;
  user :User;

  constructor(public navCtrl: NavController, public navParams: NavParams,public userProv:UserProvider , public events : Events) {
    this.getData();
 
  }

  async getData(){
    this.db=Database.getInstance();
    this.db.status = await this.userProv.getAllStatus();
    this.user = await this.userProv.getUser();
    
    if(this.user == undefined){
      this.navCtrl.setRoot(SigninPage);
    }else{
      this.events.publish('logedin');
      this.navCtrl.setRoot(HomePage,{'change' : true});
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
