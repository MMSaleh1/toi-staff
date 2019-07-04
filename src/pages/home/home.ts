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
  }
   async getItems(){
     this.orders = new Array();
     this.user = await this.userProv.getUser();
    let allOrders = new Array();
    allOrders = await this.checkCurrentOrders();
    if(allOrders.length>0){
      this.orders = allOrders;
      this.ready = true;

    }else{
      allOrders = await this.userProv.getAllOrders(this.user.gender);
      for(let i = 0 ; i<allOrders.length;i++){
        if(this.user.areaId == allOrders[i].areaId){
          this.orders.push(allOrders[i]);
        }
      }
      this.db = Database.getInstance();
      
      if(this.orders.length == 0){
        this.ready = false;
      }else{
        this.db.orders = this.orders;
        this.ready = true;
      }
    
    }
   
  }
  async checkCurrentOrders(){
    let orders = await this.userProv.getApprovedOrders(this.user.id);
    let current = new Array();
    console.log(orders);
    for(let i = 0 ;i<orders.length ;i++){
      if(orders[i].orderStatusId == "3" || orders[i].orderStatusId == "5"){
        current.push(orders[i]);
      }
    }
    console.log(current);
    return current;
  }

  toDetails(item : order){
    this.navCtrl.push(DetailsPage,{'item' : item});
  }

  ionViewDidEnter(){
    this.getItems();
   
 
   
  }
  }
