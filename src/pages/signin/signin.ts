
import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage, Events } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { User, UserProvider } from '../../providers/user/user';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { SignupPage } from '../signup/signup';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
import { EnterCodePage } from '../enter-code/enter-code';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  public loginForm: FormGroup;
  public user: User;
  constructor(public navCtrl: NavController
    , public formBuilder: FormBuilder
    , public loadCtrl: LoadingController
    , public userProvider: UserProvider
    , public storage: Storage
    , public events: Events
    , private helperTools: HelperToolsProvider
    , public notifiCtrl: NotificationsProvider

  ) {
    this.buildForm();

  }
  async checkUser() {
    let user = await this.userProvider.getUser();
    if (user.id != '-1') {
      this.navCtrl.setRoot(HomePage);
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      userName: ['', [Validators.required]],
    })
  }



  async onSignin() {
    let loading = this.loadCtrl.create({
      content: 'Logging in ,Please Wait'
    });


    if (this.loginForm.valid) {
      loading.present();
      let bool = false;
      bool = await this.userProvider.loginNop(this.loginForm.value.userName, this.loginForm.value.password);
      console.log(bool);
      if (bool == true) {
        loading.dismiss();
        this.user = User.getInstance();
        let token = await this.notifiCtrl.getDeviceId();
        console.log(token);
        this.userProvider.updateDeviceToken(this.user.id, token);
        this.user.deviceId = token;
        this.storage.set('toi-staff-user', this.user);
        this.events.publish('logedin');
        this.navCtrl.setRoot(HomePage, { 'change': true });


      } else {
        loading.dismiss();
        this.helperTools.showAlertWithOkButton('Alert', 'Wrong password, please make sure your write the correct password')
      }
    } else {
      this.helperTools.showAlertWithOkButton('Alert', 'Wrong user name or password')

    }

  }
  signup() {
    this.navCtrl.setRoot(EnterCodePage);
  }
}
