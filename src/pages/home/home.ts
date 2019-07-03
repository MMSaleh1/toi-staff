import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ItemsApiProvider, Category } from './../../providers/items-api/items-api';
import { Database } from '../../providers/database/database';
import { order, UserProvider, User } from '../../providers/user/user';
import { DetailsPage } from '../details/details';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public ready : boolean= false;
  public orders : Array<order>;
  public user : User;
  public db :Database;

  constructor(public navCtrl: NavController,public userProv:UserProvider) {
   this.orders = new Array();
   this.getItems();
  }
   async getItems(){
     this.user = this.userProv.getUser();
    let allOrders = new Array();
    allOrders = await this.userProv.getAllOrders(this.user.gender);
    console.log(allOrders);
    for(let i = 0 ; i<allOrders.length;i++){
      console.log(this.user.areaId + "" + allOrders[i].areaId);
      if(this.user.areaId == allOrders[i].areaId){
        this.orders.push(allOrders[i]);
      }
    }
    console.log(this.orders);
    this.db = Database.getInstance();
    
    if(this.orders.length == 0){
      this.ready = false;
    }else{
      this.db.orders = this.orders;
      this.ready = true;
    }
  }

  toDetails(item : order){
    this.navCtrl.push(DetailsPage,{'item' : item});
  }

  ionViewDidLoad(){
   
 
   
  }
  }
