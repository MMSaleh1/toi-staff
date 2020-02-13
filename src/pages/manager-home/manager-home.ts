import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsApiProvider } from '../../providers/items-api/items-api';
import { UserProvider, User } from '../../providers/user/user';

/**
 * Generated class for the ManagerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager-home',
  templateUrl: 'manager-home.html',
})
export class ManagerHomePage {
  orderViewData ={index : 0 , count : 10};
  public user : User;
  public orderArray ;
  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
    private itemsCtrl : ItemsApiProvider,
    private userCtrl : UserProvider
      ) {
        this.orderArray = new Array();
        userCtrl.getUser().then(data=>{
        this.user  = <User>data;
        this.getOrders();
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerHomePage');
  }

  async getOrders(){
    this.orderArray.push(... await this.itemsCtrl.getManagerOrders(this.orderViewData.index,this.orderViewData.count,this.user.Manager.branchId));
  }

}
