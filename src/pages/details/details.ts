import { Database } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { order, UserProvider, orderItem, User } from '../../providers/user/user';

import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public order : order;
  public orderItems : Array<orderItem>;
  public user : User;
  public db: Database;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public userProv : UserProvider , public call :CallNumber) {
    this.order = navParams.get('item');
    this.db = Database.getInstance();
    console.log(this.db.status);
 ;
    this.orderItems = new Array();
    this.getData();
  }

  async getData(){
    this.orderItems = await this.userProv.getorderItems(this.order.id);
    this.user = await this.userProv.getUser();
    console.log(this.orderItems);
    console.log(this.user)
  }

  async makeCall(){
    this.call.callNumber(this.order.customerPhone, true)
  .then(res => console.log( res))
  .catch(err => console.log(err));
  }
  async changeStatus(){
    // let newStatus ;
    // if(this.order.orderStatusId == '1'){
    //   newStatus ="3";
    // }else if(this.order.orderStatusId =='3'){
    //   newStatus = "5"
    // }else if(this.order.orderStatusId =='5'){
    //   newStatus ="6";
    // }else{
    //   newStatus = "4"
    // }
    // // let bool =await this.userProv.changeStatus(this.user.id,this.order.id,newStatus);
    // this.order.orderStatusId = newStatus;
    // this.navCtrl.pop();
    // console.log(bool);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
