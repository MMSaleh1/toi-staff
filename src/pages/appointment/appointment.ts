import { CartProvider } from './../../providers/cart/cart';
import { Category, Product } from './../../providers/items-api/items-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html'
})
export class AppointmentPage {
  category : Category;
  products : Array<Product>;
  cart : CartProvider;

  constructor(public navCtrl: NavController , public navparms :NavParams) {
    this.category = this.navparms.get("cate");
    this.products = new Array();
    this.products = this.category.children;
    console.log(this.products);
    console.log(this.category); 
    this.cart = CartProvider.getInstance();

  }

  addtoCart(item : Product){
    this.cart.addItem(item);
    console.log(this.cart);
  }
  

}
