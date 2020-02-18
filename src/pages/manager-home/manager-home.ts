import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsApiProvider } from '../../providers/items-api/items-api';
import { UserProvider, User } from '../../providers/user/user';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { ManagerOrderDetailsPage } from '../manager-order-details/manager-order-details';
import { LandingPage } from '../landing/landing';

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
    private userCtrl : UserProvider,
    private helperTools : HelperToolsProvider
      ) {
        this.orderArray = new Array();
        userCtrl.getUser().then(data=>{
        this.user  = <User>data;
        this.getOrders(undefined);
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerHomePage');
  }

  async getOrders(event){
    this.orderArray.push(... await this.itemsCtrl.getManagerOrders(this.orderViewData.index,this.orderViewData.count,this.user.Manager.branchId));
    console.log(this.orderArray);
    this.orderViewData.index += this.orderViewData.count;
    console.log(event);
    if(event != undefined){
      event.complete();
    }
  }

  async navToOrderDetails(order){
    this.navCtrl.push(ManagerOrderDetailsPage,{order : order});
  }

  doRefresh(event){
    this.orderViewData ={index : 0 , count : 10};
    this.orderArray = new Array();
    console.log(event);
    this.getOrders(event);

  }


  public async logOut(){
    await this.userCtrl.logout();
    this.navCtrl.setRoot(LandingPage);
  }

}
