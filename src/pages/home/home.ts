import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database/database';
import { order, UserProvider, User, orderItem } from '../../providers/user/user';
import { SigninPage } from '../signin/signin';

import { CallNumber } from '@ionic-native/call-number';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public ready : boolean= false;

  public order : order;
  public user : User;
  public db :Database;
  public orderItems : Array<orderItem>;

  constructor(public navCtrl: NavController,public userProv:UserProvider,public navParms : NavParams , public call :CallNumber) {
    this.getData();
  }
  

  async getData(){
    this.user = await this.userProv.getUser();

    this.checkAcceptedOrder();
    console.log(this.user)
  }

  public async checkAcceptedOrder(){
    let order = await this.userProv.getAcceptedOrder(this.user.id);
    console.log(order);
    if(order == undefined){
      setTimeout(() => {
        this.checkAcceptedOrder()
      },1000);
    }else{
      this.order =order;
      this.orderItems = await this.userProv.getorderItems(this.order.id);
      this.changeUserStatus();
      this.ready=true;
    }
  }
  private async changeUserStatus(){
    let status = await this.userProv.changeStaffStatus(this.user.id,'0');
    console.log(status);
    if(status != true){
      this.changeUserStatus();
    }else{
      return;
    }
  }



  //  async getItems(){
  //    this.orders = new Array();
  //    this.user = await this.userProv.getUser();
  //   let allOrders = new Array();
  //   allOrders = await this.checkCurrentOrders();
  //   if(allOrders.length>0){
  //     this.orders = allOrders;
  //     this.ready = true;

  //   }else{
  //     allOrders = await this.userProv.getAllOrders(this.user.gender);
  //     for(let i = 0 ; i<allOrders.length;i++){
  //       if(this.user.areaId == allOrders[i].areaId){
  //         this.orders.push(allOrders[i]);
  //       }
  //     }
  //     this.db = Database.getInstance();
      
  //     if(this.orders.length == 0){
  //       this.ready = false;
  //     }else{
  //       this.db.orders = this.orders;
  //       this.ready = true;
  //     }
    
  //   }
   
  // }
  // async checkCurrentOrders(){
  //   let orders = await this.userProv.getApprovedOrders(this.user.id);
  //   let current = new Array();
  //   console.log(orders);
  //   for(let i = 0 ;i<orders.length ;i++){
  //     if(orders[i].orderStatusId == "3" || orders[i].orderStatusId == "5"){
  //       current.push(orders[i]);
  //     }
  //   }
  //   console.log(current);
  //   return current;
  // }

  // toDetails(item : order){
 
  //   this.navCtrl.push(DetailsPage,{'item' : item});
  // }

  // ionViewDidEnter(){
  //   let change = this.navParms.get('change');
  //   if(change == true){
  //     this.getItems();
  //   }
   
  // }
logOut(){
   this.userProv.logout();
   this.navCtrl.setRoot(SigninPage);
}


async makeCall(){
  this.call.callNumber(this.order.customerPhone, true)
.then(res => console.log( res))
.catch(err => console.log(err));
}


async changeStatus(){
  let newStatus ;
  if(this.order.orderStatusId == '1'){
    newStatus ="3";
  }else if(this.order.orderStatusId =='3'){
    newStatus = "5"
  }else if(this.order.orderStatusId =='5'){
    newStatus ="6";
  }else{
    newStatus = "4"
  }
  let bool =await this.userProv.changeStatus(this.user.id,this.order.id,newStatus);
  this.order.orderStatusId = newStatus;
  if(this.order.orderStatusId == "6"){
  this.userProv.changeStaffStatus(this.user.id,'1');
    this.ready = false;
  }
  // this.navCtrl.pop();
}

  }
