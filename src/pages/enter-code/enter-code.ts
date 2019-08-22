import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';

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

  constructor(public navCtrl: NavController,
    private helperTools: HelperToolsProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterCodePage');
  }

  goToSignUp() {
    this.helperTools.ShowAlertWithTranslation('Alert', 'SoonThisFeatureWillBeAva')
    // this.navCtrl.setRoot(SignupPage);
  }

}
