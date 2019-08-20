import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserProvider, order, User, orderItem } from '../../providers/user/user';
import { CallNumber } from '@ionic-native/call-number';
import { Database } from '../../providers/database/database';
import { SigninPage } from '../signin/signin';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { HomePage } from '../home/home';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  public ready: boolean = false;
  order_details = {} as any;
  public order: order;
  public user: User;
  public db: Database;
  public orderItems: Array<orderItem>;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    public userProv: UserProvider,
    public navParms: NavParams,
    private launchNavigator: LaunchNavigator,
    public call: CallNumber,
    public helperTool: HelperToolsProvider



  ) {
    this.order_details = this.navParms.get('data');
    this.userProv.getorderItems(this.order_details.id).then(data=>{
      this.orderItems = data;
      this.ready =true;
    });
    this.getData(undefined);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }


  async getData(ev) {
    this.user = await this.userProv.getUser();

    // this.checkAcceptedOrder();
    console.log(this.user)
    if (ev) {
      ev.complete()
    }
  }

  // public async checkAcceptedOrder() {
  //   let order = await this.userProv.getAcceptedOrder(this.user.id);
  //   //console.log(order);
  //   if (order == undefined) {
  //     setTimeout(() => {
  //       this.checkAcceptedOrder()
  //     }, 1000);
  //   } else {
  //     this.order = order;
  //     this.ready = true;
  //     setTimeout(() => {
  //       this.checkAcceptedOrder()
  //     }, 3000);
  //   }
  // }
  private async changeUserStatus() {
    console.log(this.userProv.queue);
    console.log(this.userProv.available);
    let available = (this.userProv.queue == '1') ? '0' : '1';
    console.log(this.userProv.available);
    let status = await this.userProv.changeStaffStatus(this.user.id, available, '0');



    console.log(status);
    if (status != true) {
      this.changeUserStatus();
    } else {
      return;
    }
  }



  logOut() {
    this.userProv.logout();
    this.navCtrl.setRoot(SigninPage);
  }


  async makeCall() {
    this.call.callNumber(this.order_details.customerPhone, true)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }


  async changeStatus() {
    let newStatus;
    this.helperTool.ShowLoadingSpinnerOnly();
    if (this.order_details.orderStatusId == '1') {
      newStatus = "3";
    } else if (this.order_details.orderStatusId == '3') {
      newStatus = "5"
    } else if (this.order_details.orderStatusId == '5') {
      newStatus = "6";
    } else {
      newStatus = "4"
    }
    let bool = await this.userProv.changeStatus(this.user.id, this.order_details.id, newStatus, this.order_details.userToken, this.order_details.user_id);
    this.order_details.orderStatusId = newStatus;

    this.helperTool.DismissLoading();
    if (this.order_details.orderStatusId == "6") {
      await this.changeUserStatus();
      this.ready = false;
      this.navCtrl.setRoot(HomePage)
    }

  }

  navToCustomerPos(lat, long) {
    // let destination = lat + "," + long;
    // if (this.platform.is("ios")) {
    //   window.open("maps://?q=" + destination, "_system");
    // } else {
    //   let label = encodeURI('Customer Location');
    //   window.open("geo:0,0?q=" + destination + "(" + label + ")", "_system");
    let dest = [lat, long]
    this.launchNavigator.navigate(dest)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );

    // }
  }

  doRefresh(event) {
    this.getData(event);
  }



}
