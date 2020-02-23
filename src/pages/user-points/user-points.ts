import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider, User } from '../../providers/user/user';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';

/**
 * Generated class for the UserPointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-points',
  templateUrl: 'user-points.html',
})
export class UserPointsPage {

  public user : User;
  constructor(public navCtrl: NavController, public navParams: NavParams , public userCtrl: UserProvider,private helperTools : HelperToolsProvider) {

     this.userCtrl.getUser().then(data=>{
       this.user=data;
        this.userCtrl.loginNop(this.user.stylist.userName,this.user.stylist.password);
        this.userCtrl.getUser().then(data2=>{
          this.user = data2;
          console.log(this.user);
        })
       
     });
  }


  async ionViewDidLoad() {
    await this.helperTools.ShowLoadingSpinnerOnly();
    const userData = await this.userCtrl.getUser();
    await this.userCtrl.loginNop(userData.stylist.userName,userData.stylist.password);
    this.user = await this.userCtrl.getUser();
    console.log(this.user);
    this.helperTools.DismissLoading();
  }

}
