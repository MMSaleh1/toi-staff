import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, UserProvider } from '../../providers/user/user';
import { HelperToolsProvider } from '../../providers/helper-tools/helper-tools';
/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  public updateForm: FormGroup;
  public user: User
  public ready = false;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private helperTools: HelperToolsProvider,
    public userProv: UserProvider,
    public navParams: NavParams) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }
  async buildForm() {
    this.user = await this.userProv.getUser();
    this.updateForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    })
    this.ready = true;
  }

  // public async update() {
  //   console.log(this.updateForm.value.userName);
  //   if (this.updateForm.valid) {
  //     this.helperTools.ShowLoadingSpinnerOnly();
  //     this.userProv.updateProfile(this.user.id, this.updateForm.value.userName, this.updateForm.value.phone, this.updateForm.value.email, this.updateForm.value.password, "").then(data => {
  //       this.helperTools.DismissLoading();
  //       this.helperTools.ShowAlertWithTranslation('Done', "Profile has been updated successfully, Thank you.")
  //       this.navCtrl.pop();
  //     })
  //   }
  // }

}
