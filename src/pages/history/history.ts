import { orderStatus } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { order, User, UserProvider } from '../../providers/user/user';
import { OrderDetailsPage } from '../order-details/order-details';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public order_data: Array<order>;
  public user : User;
  public ready :boolean;
  public allorderStatus : Array<orderStatus>;
  constructor(public navCtrl: NavController, public navParams: NavParams , public userProv : UserProvider) {
    this.order_data = new Array();
    this.ready = false;
    this.getData();
  }

  async getData() {
    this.user = await this.userProv.getUser();
    await this.checkAcceptedOrder();
    this.ready = true;
    console.log(this.user)
  
  }


  
  public async checkAcceptedOrder() {
    this.order_data = await this.userProv.getHistory(this.user.id);
    this.allorderStatus = await this.userProv.getAllStatus();
    for(let i =0 ; i < this.allorderStatus.length; i ++){
      for(let j=0 ; j< this.order_data.length;j++){
        if(this.allorderStatus[i].id == this.order_data[j].orderStatusId){
          this.order_data[j].orderStatus = this.allorderStatus[i].name;
        }
      }
    }
     console.log(this.order_data)
    // console.log(order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  getColor(id : string){
    if(id == '4'){
      return '#ff0000';
    }else if(id == '6'){
      return '#00ff00';
    }else{
      return '0000ff';
    }
  }


  goToOrderDet(clicked_order) {
    this.navCtrl.push(OrderDetailsPage, { data: clicked_order , bool : false })
  }

}
