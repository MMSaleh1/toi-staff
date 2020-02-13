import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, Platform, PopoverController } from 'ionic-angular';
import { Database } from '../../providers/database/database';
import { order, UserProvider, User, orderItem } from '../../providers/user/user';
import { SigninPage } from '../signin/signin';

import { CallNumber } from '@ionic-native/call-number';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { OrderDetailsPage } from '../order-details/order-details';
// import { WalletComponent } from '../../components/wallet/wallet';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public ready: boolean = false;
  order_data: Array<order>;
  public order: order;
  public user: User;
  public db: Database;
  public orderItems: Array<orderItem>;
  stopCond = false;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    public userProv: UserProvider,
    private launchNavigator: LaunchNavigator,
    public navParms: NavParams,
    public call: CallNumber,
    public helperTool: HelperToolsProvider,
    public popoverCtrl: PopoverController
  ) {
    this.order_data = new Array();
  }


  ionViewDidEnter(){
    console.log('viewEntered')
    this.stopCond= false;
    this.getData(undefined);
   
  }
  async getData(ev) {
    this.user = await this.userProv.getUser();
    console.log(this.user)
    this.checkAcceptedOrder();
    
    if (ev) {
      ev.complete()
    }
  }


  public async checkAcceptedOrder() {
    if(this.stopCond == true){
      return
    }
    let tempData = new Array<order>();
    let userData  = this.user.stylist;
    console.log(userData);
    // tempData = await this.userProv.getAcceptedOrder(this.user.getUser().id);
    // console.log(this.order_data)
    // console.log(order);
    if (tempData == undefined) {
     this.order_data =[]
      setTimeout(() => {
        this.checkAcceptedOrder()
      }, 1000);
    } else {
      if(this.order_data == undefined){
        this.order_data = tempData;
      }else{
        if(this.order_data.length != tempData.length){
          this.order_data = tempData;
        }else{
          for(let i = 0 ; i< this.order_data.length ; i++){
            if(this.order_data[i].id != tempData[i].id){
              this.order_data = tempData;
              break;
            }
        }
        }
        
      }
      setTimeout(() => {
        this.checkAcceptedOrder()
      }, 3000);
    }
  }
  private async changeUserStatus() {
    console.log(this.userProv.queue);
    console.log(this.userProv.available);
    let available = (this.userProv.queue == '1') ? '0' : '1';
    console.log(this.userProv.available);
    let status = await this.userProv.changeStaffStatus(this.user.stylist.id, available, '0');



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


  // async changeStatus() {
  //   let newStatus;
  //   this.helperTool.ShowLoadingSpinnerOnly();
  //   if (this.order.orderStatusId == '1') {
  //     newStatus = "3";
  //   } else if (this.order.orderStatusId == '3') {
  //     newStatus = "5"
  //   } else if (this.order.orderStatusId == '5') {
  //     newStatus = "6";
  //   } else {
  //     newStatus = "4"
  //   }
  //   let bool = await this.userProv.changeStatus(this.user.id, this.order.id, newStatus, this.order.userToken);
  //   this.order.orderStatusId = newStatus;

  //   this.helperTool.DismissLoading();
  //   if (this.order.orderStatusId == "6") {
  //     await this.changeUserStatus();
  //     this.ready = false;

  //     this.checkAcceptedOrder();
  //   }

  // }

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

  onCallClicked(numb) {
    this.call.callNumber(numb, true)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  onLocationClicked(lat, long) {
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
  goToOrderDet(clicked_order) {
    console.log(clicked_order);
    this.navCtrl.push(OrderDetailsPage, { data: clicked_order })
  }
  
  ionViewWillLeave(){
    console.log('view leave')
   this.stopCond = true;
  }

  // openWallet(){
  //   let Wpop = this.popoverCtrl.create(WalletComponent);
  //   Wpop.present();
  // }

}
