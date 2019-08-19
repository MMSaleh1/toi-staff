import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserProvider, order, User, orderItem } from '../../providers/user/user';
import { CallNumber } from '@ionic-native/call-number';
import { Database } from '../../providers/database/database';
import { SigninPage } from '../signin/signin';

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

  public order: order;
  public user: User;
  public db: Database;
  public orderItems: Array<orderItem>;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    public userProv: UserProvider,
    public navParms: NavParams,
    public call: CallNumber) {
    this.getData(undefined);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

  async getData(ev) {
    this.user = await this.userProv.getUser();

    this.checkAcceptedOrder();
    console.log(this.user)
    if (ev) {
      ev.complete()
    }
  }

  public async checkAcceptedOrder() {
    let order = await this.userProv.getAcceptedOrder(this.user.id);
    console.log(order);
    if (order == undefined) {
      setTimeout(() => {
        this.checkAcceptedOrder()
      }, 1000);
    } else {
      this.order = order;
      this.orderItems = await this.userProv.getorderItems(this.order.id);
      this.changeUserStatus();
      this.ready = true;
      setTimeout(() => {
        this.checkAcceptedOrder()
      }, 3000);
    }
  }
  private async changeUserStatus() {
    let status = await this.userProv.changeStaffStatus(this.user.id, this.userProv.available, this.userProv.queue);
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
    this.call.callNumber(this.order.customerPhone, true)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }


  async changeStatus() {
    let newStatus;
    if (this.order.orderStatusId == '1') {
      newStatus = "3";
    } else if (this.order.orderStatusId == '3') {
      newStatus = "5"
    } else if (this.order.orderStatusId == '5') {
      newStatus = "6";
    } else {
      newStatus = "4"
    }
    let bool = await this.userProv.changeStatus(this.user.id, this.order.id, newStatus, this.order.userToken);
    this.order.orderStatusId = newStatus;
    if (this.order.orderStatusId == "6") {
      this.userProv.changeStaffStatus(this.user.id, this.userProv.available, this.userProv.queue);
      this.ready = false;
      this.checkAcceptedOrder();
    }
  }

  navToCustomerPos(lat, long) {
    let destination = lat + "," + long;
    if (this.platform.is("ios")) {
      window.open("maps://?q=" + destination, "_system");
    } else {
      let label = encodeURI('Customer Location');
      window.open("geo:0,0?q=" + destination + "(" + label + ")", "_system");
    }
  }

  doRefresh(event) {
    this.getData(event);
  }

}
