import { Component } from '@angular/core';
import { ViewController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the WalletComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wallet',
  templateUrl: 'wallet.html'
})
export class WalletComponent {

  order_price;
  user_wallet;
  collected;
  constructor(private viewCtrl: ViewController,
    public navParams: NavParams,
    public events: Events) {
    console.log('Hello WalletComponent Component');
  }

  close() {
    this.viewCtrl.dismiss();
  }


  onPaymentDone(){
    this.viewCtrl.dismiss();
  }


}
