
import { LandingPage } from './../pages/landing/landing';
import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { Storage } from "@ionic/storage";


import { UserProvider, User } from './../providers/user/user';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../pages/home/home';
// import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { OrderDetailsPage } from '../pages/order-details/order-details';
import { HelperToolsProvider } from '../providers/helper-tools/helper-tools';
import { HistoryPage } from '../pages/history/history';
import { CheckUserPage } from '../pages/check-user/check-user';
import { CheckUserPageModule } from '../pages/check-user/check-user.module';
import { UserPointsPage } from '../pages/user-points/user-points';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public user: User;
  rootPage: any = CheckUserPage;
  isLogedin: boolean = false;

  constructor(public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public userProv: UserProvider,
    private storage: Storage,
    private helperTools: HelperToolsProvider,
    private menuCntrl: MenuController,
    private translate: TranslateService,
    public event: Events,
    private notifyCtrl: NotificationsProvider,
    ) {
    
    platform.ready().then(() => {

      
      this.initTranslate();
      // this.helperTools.IntializeUSerCurrentPosition()
      this.event.subscribe('logedin', () => {
        this.userProv.getUser().then(data => {
          this.user = data;
          //console.log(this.user);
          if (platform.is('cordova')) {
            //console.log('this is cordova')
            this.notifyCtrl.init().then(()=>{
              this.getUserToken();
            });
          }
         
          this.user.type == 'manager' ?  this.menuCntrl.enable(false) :  this.menuCntrl.enable(true);
          // this.isLogedin = true;
          //console.log(this.user)
        });

      




      })
      this.event.subscribe('user-updates',()=>{
        this.userProv.getUser().then(data => {
          this.user = data;
         //console.log(this.user);
        

        });

      })

     
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.storage.get('language').then(data => {
      //console.log(data)
      if (data) {
        if (data == 'ar') {
          this.translate.use('ar');
          this.platform.setDir('rtl', true);
        } else {
          this.translate.use('en');
          this.platform.setDir('ltr', true);
        }
      } else {
        this.translate.use('en');
        this.platform.setDir('ltr', true);
      }
    });
  }

  rememberUser() {
    this.storage.get('toi-staff-user').then(data => {
      //console.log(data);
      if (data) {
        this.user = data;
        //console.log('nav to home')
        this.nav.setRoot(HomePage)
        // this.rootPage = HomePage
      }
      else {
        //console.log('nav again')
        this.nav.setRoot(CheckUserPage)
      }
    })
  }

  toPage(number) {
    //console.log(number);
    if (number == 1) {
      this.nav.setRoot(HomePage);
    } else if (number == 2) {
      //this.helperTools.ShowAlertWithTranslation('Alert', "SoonThisFeatureWillBeAva")
       this.nav.push(HistoryPage);
    } else if (number == '3') {
      this.nav.push(UpdateProfilePage);
    }else if( number == '4'){
      this.nav.push(UserPointsPage);
    }
    this.menuCntrl.close()
  }
  public async getUserToken(){
    this.user = await this.userProv.getUser();
    let token = await this.notifyCtrl.getDeviceId();
    let id = this.user.type == 'manager' ? this.user.Manager.id:this.user.stylist.id;
    this.userProv.updateDeviceToken(id, token);
    this.user.type == 'manager' ?  this.user.Manager.deviceId = token: this.user.stylist.deviceId = token;
    this.userProv.saveUser(this.user);
  }
  
  logOut() {
    this.helperTools.ShowAlertWithTranslation('Done', "LogOutDone")
    this.userProv.logout();
    this.menuCntrl.enable(false);
    this.nav.setRoot('CheckUserPage');
  }

 
}


