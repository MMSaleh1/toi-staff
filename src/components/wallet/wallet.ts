import { Component } from '@angular/core';
import { ViewController, NavParams, Events, NavController, Platform } from 'ionic-angular';
import { UserProvider, User } from '../../providers/user/user';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { HomePage } from '../../pages/home/home';
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

  public order_price: number = 0;
  public user_wallet: number = 0;
  public collected: number = 0;
  public user_current_wallet: number = 0;
  public order_current_price: number = 0;
  public walletChangeAmmout: number = 0;
  public user: User
  public canSubmit: boolean = false;
  order_details = {} as any;
  estimated_duration;

  constructor(private viewCtrl: ViewController,
    public navParams: NavParams,
    public events: Events,
    private navCtrl: NavController,
    public userProv: UserProvider,
    private platform: Platform,
    public helperTool: HelperToolsProvider
  ) {
    this.order_price = navParams.get('totalPrice');
    this.order_current_price = this.order_price;
    this.user_wallet = navParams.get('wallet');
    //  this.user_wallet = -50;
    this.user_current_wallet = this.user_wallet;
    this.order_details = navParams.get('order_details');
    this.estimated_duration = navParams.get('duration');

    console.log('Hello WalletComponent Component');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  change() {
    if (this.user_wallet > 0 || this.user_wallet == 0) {
      let temp = parseInt(this.collected.toString()) + parseInt(this.user_wallet.toString())

      let temp2 = parseInt(temp.toString()) - parseInt(this.order_price.toString());
      if (temp2 >= 0) {
        this.user_current_wallet = temp2;
        this.canSubmit = true;
      } else {
        this.user_current_wallet = this.user_wallet;
        this.canSubmit = false;
      }

    } else {
      this.order_current_price = -this.user_wallet + this.order_price;
      // let temp = (this.order_current_price +this.user_wallet);
      let wallet = (this.collected - this.order_current_price);
      if (wallet >= 0) {
        this.user_current_wallet = wallet;
        this.canSubmit = true;
      } else {
        this.user_current_wallet = this.user_wallet;
        this.canSubmit = false;
      }
      this.user_current_wallet = wallet >= 0 ? wallet : this.user_current_wallet;
      // console.log();
    }
    this.walletChangeAmmout =this.user_current_wallet -this.user_wallet;
    console.log(this.walletChangeAmmout);
  }

  async onPaymentDone() {
this.helperTool.ShowLoadingSpinnerOnly();
    if (this.canSubmit == true) {
      //  console.log("Done");
      this.user = User.getInstance();
      let bool = await this.userProv.changeStatus(this.user.id, this.order_details.id, "6", this.order_details.userToken, this.order_details.user_id, this.estimated_duration);
      await this.changeUserStatus();
      await this.userProv.changeUserWallet(this.order_details.id, this.user.id, this.walletChangeAmmout, "", this.order_details.user_id);
      this.helperTool.DismissLoading();
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(HomePage)
    } else {
      let requiredAmmount = 0;
      if (this.user_wallet >= 0) {


        requiredAmmount = parseInt(this.user_wallet.toString()) - parseInt(this.order_price.toString());
        requiredAmmount = requiredAmmount > 0 ? requiredAmmount : (requiredAmmount - (requiredAmmount * 2));
      } else {
        requiredAmmount = -this.user_wallet + this.order_price;
      }
      if (this.platform.dir() === 'ltr') {
        this.helperTool.DismissLoading();
        this.helperTool.ShowAlertWithTranslation("Alert", "The required ammount must be " + requiredAmmount + " L.E. or higher");
      }
      else {
        this.helperTool.DismissLoading();
        this.helperTool.ShowAlertWithTranslation("تنبيه", "القيمه المتسحقه لا يجب ان تقل عن " + requiredAmmount + " جم او اكثر");
      }
    }


  }


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




}
