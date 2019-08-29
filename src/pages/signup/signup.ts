import { Component } from '@angular/core';
import { NavController, LoadingController, Events, NavParams } from 'ionic-angular';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';

import { User, UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public regesterForm: FormGroup;
  public user: User;
  public hasImage: boolean;
  public base64: string = "";
  public displayImage: string = "";
  gender : string = "";
  branch_id;
  ImageProcess: any;
  constructor(public navCtrl: NavController
    , public formBuilder: FormBuilder
    , public loadCtrl: LoadingController
    , public userProvider: UserProvider
    , public events: Events
    , public navParams: NavParams
    , private helperTools: HelperToolsProvider
    , public storage: Storage
    , public notifiCtrl: NotificationsProvider
  ) {
    this.buildForm();
    this.hasImage = false;
    this.branch_id = this.navParams.get('branchId')
    console.log(new Date().getTime() + "1234425");

  }

  buildForm() {
    this.regesterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      userName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      passwordConfirm: new FormControl("", [Validators.required, this.equalto("password")]),
      phone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],

    })
  }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;

      let isValid = control.root.value[field_name] == input;
      if (!isValid) return { equalTo: { isValid } };
      else return null;
    };
  }
  home() {
    // this.navCtrl.setRoot(TabsPage);
  }

  signin() {
    this.navCtrl.setRoot(SigninPage);
  }

  onSubmit() {
    console.log(this.pwValidity());


  }
  pwValidity(): Boolean {
    return this.regesterForm.value.password == this.regesterForm.value.passwordConfirm ? true : false;

  }

  public async onRegester() {
    console.log('clicked')
    if (this.regesterForm.value.passwordConfirm != this.regesterForm.value.password) {
      // alert("Password does Not Match")
    } else {
      if (this.regesterForm.valid) {
        this.helperTools.ShowLoadingSpinnerOnly();
        let token = await this.notifiCtrl.getDeviceId();
        // this.user.image = this.ImageProcess.getUserImageUrl(await this.userProvider.sendImage(this.base64));
        let add = await this.userProvider.registration(this.regesterForm.value.name, this.regesterForm.value.phone, this.regesterForm.value.password, this.base64, this.gender, this.regesterForm.value.userName, this.branch_id, token);
        console.log(add);
        this.helperTools.DismissLoading();
        if (add == []) {
          this.user = User.getInstance();
          this.storage.set('user', this.user);
          this.events.publish('logedin')
          console.log(this.userProvider.user);
          this.navCtrl.setRoot(HomePage);

        } else if('') {
          this.helperTools.ShowAlertWithTranslation('Error', "UsernameAlreadyExists")
        }
        this.helperTools.DismissLoading();

      } else {
        this.helperTools.DismissLoading();
        this.helperTools.ShowAlertWithTranslation('Error', "Invalidfields")
      }

    }


  }

  public getPhoto() {
    this.helperTools.OpenImage().then((data: any) => {
      console.log(data);
      if (data != 'cancel') {
        this.base64 = data;
        this.displayImage = 'data:image/jpeg;base64,' + data;
      }

      //'data:image/jpeg;base64,' 
      // this.hasImage = true;

    });
  }

  onChange(ev) {
    console.log(ev)
    this.gender = ev;
    this.gender = this.gender.toString();
    console.log(this.gender)
  }
}