import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events, AlertController } from 'ionic-angular';
import { ItemsApiProvider } from '../../providers/items-api/items-api';
import { UserProvider, User } from '../../providers/user/user';
import { ManagerStylistAssignmentComponent } from '../../components/manager-stylist-assignment/manager-stylist-assignment';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the PagesManagerOrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager-order-details',
  templateUrl: 'manager-order-details.html',
})
export class ManagerOrderDetailsPage {
  public order
  public orderItems : Array<any>;
  public viewReady=false;
  public selectOrderItemId;
  public user : User;
  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
     private userCtrl : UserProvider ,
     private popoverCtrl : PopoverController,
     private events : Events,
     private alertCtrl : AlertController,
     private launchNavigator : LaunchNavigator,
     private call : CallNumber
        ) {
    this.order = this.navParams.get('order');
    console.log(this.order);
    this.orderItems = new Array();
    this.events.subscribe('stylistSelected',(data)=>{
      console.log(this.selectOrderItemId)
      this.orderItems.forEach((item)=>{
        if(item.id == this.selectOrderItemId){ 
          item.stylistId = data['id'];
          item.stylistName = data['name'];
        }
      })
   
      console.log(this.orderItems)
    })
  }
  async getOrderAdress(){
    // this.userCtrl.getOrder

  }

  async ionViewDidLoad() {
    this.user = await this.userCtrl.getUser();
    console.log(this.user)
    this.orderItems = await this.userCtrl.getorderItems(this.order.id);
    console.log(this.orderItems);
    this.viewReady = true;
  }


  public openStylistModal(orderItemId){
    this.selectOrderItemId = orderItemId;
    const popover = this.popoverCtrl.create(ManagerStylistAssignmentComponent );
    popover.present();
    
  }


  async makeCall() {
    this.call.callNumber(this.order.user_phone, true)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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



  public async confirmOrder(){


    let orderItemPromiseArray = new Array();
    let newStatus = 3;
    for(let i = 0 ; i< this.orderItems.length;i++){
      orderItemPromiseArray.push(this.userCtrl.updateOrderItem(this.orderItems[i]));
    }
   let responces = await Promise.all(orderItemPromiseArray);
   console.log(responces);
    await this.userCtrl.managerChangeOrderStatus(this.user.Manager.id,this.order.id,newStatus);
    let alert  =  this.alertCtrl.create({
      title : 'Success',
      message : `You have successfully updated the order`,
      buttons : [
      {
        text: 'confirm',
        role: 'ok',
        handler:  ()=> {
        
         this.navCtrl.pop();
        }
      }
      ]
    })

    alert.present();
  }

  public checkAllStylistAssigned() :boolean{
    for(let i =0 ; i< this.orderItems.length;i++){
      if(this.orderItems[i].stylistId == ""){
        return false;
      }
    }
    return true;
  }

}
