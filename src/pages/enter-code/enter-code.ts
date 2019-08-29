import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the EnterCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enter-code',
  templateUrl: 'enter-code.html',
})
export class EnterCodePage {
  code : string;
  constructor(public navCtrl: NavController,
    private helperTools: HelperToolsProvider,
    public navParams: NavParams,
    public userCntrl : UserProvider, 
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterCodePage');
  }

  async goToSignUp() {
    let output = await this.userCntrl.checkCode(this.code);
    if(output.length > 0 ){
      this.navCtrl.setRoot(SignupPage,{'branchId' : output[0].branch_id});
    }else{
      this.helperTools.ShowAlertWithTranslation('Alert', 'ThisCodeIsNotAValidCode')
    }
    
    // this.navCtrl.setRoot(SignupPage);
  }


}
