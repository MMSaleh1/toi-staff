import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ItemsApiProvider, Category } from './../../providers/items-api/items-api';
import { Database } from '../../providers/database/database';
import { order, UserProvider, User } from '../../providers/user/user';


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
    this.orders = await this.userProv.getAllOrders(this.user.gender);
    console.log(this.orders[0].orderDate.toTimeString());
    this.db = Database.getInstance();
    this.db.orders = this.orders;
    this.ready = true;
    return true;
  }

  ionViewDidLoad(){
   
 
   
  }
  }
