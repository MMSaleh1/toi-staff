import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, UserProvider, ImageProcess } from '../../providers/user/user';
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
  public base64 : string = "";
  public displayImage :string = "";

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
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      // email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      // gender: ['',[Validators.required]]
    })
    this.ready = true;
  }

  public async update() {
   // this.helperTools.ShowAlertWithTranslation('Alert', "SoonThisFeatureWillBeAva")
    console.log(this.updateForm.valid);
    //   console.log(this.updateForm.value.userName);
       if (this.updateForm.valid) {
         this.helperTools.ShowLoadingSpinnerOnly();
         this.user.name = this.updateForm.value.name  ;
         this.user.userName =  this.updateForm.value.userName  ;
         this.user.password =  this.updateForm.value.password  ;
        //  this.user.gender =  this.updateForm.value.gender  ;
         this.user.phone =  this.updateForm.value.phone  ;
        //  this.user.email =  this.updateForm.value.email  ;
         console.log(this.user);
         if(this.base64.length >  1){

        // let name = this.user.id+ new Date().getTime();
        // console.log(name);
        // console.log(this.helperTools.uploadPic(this.base64,RootProvider.UserImageUrl,name));
        this.user.serverImage = await this.userProv.sendImage(this.base64)
       this.user.image = ImageProcess.getUserImageUrl(this.user.serverImage);
      //  alert(this.user.image);
        //  this.user.image = RootProvider.UserImageUrl+name;
      }
         let bool = await this.userProv.updateUser(this.user);
         console.log(bool);
         this.helperTools.DismissLoading();
         this.helperTools.ShowAlertWithTranslation('Done', "ProfilehasbeenupdatedsuccessfullyThankyou")
         this.navCtrl.pop();
        // this.userProv.updateUser(this.user).then(data => {
         
        //  })
        // this.helperTools.DismissLoading();
      }
  }

  public getPhoto(){
    this.helperTools.OpenImage().then((data : any)=>{
      console.log(data);
      if(data != 'cancel'){
        this.base64 =  data;
        this.displayImage = 'data:image/jpeg;base64,' +data;
      }
       //'data:image/jpeg;base64,' 
      // this.hasImage = true;
     
    });
  }



}
