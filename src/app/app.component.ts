import { LandingPage } from './../pages/landing/landing';
import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
 
import { UserProvider, User } from './../providers/user/user';
import { NotificationsProvider } from '../providers/notifications/notifications';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public user : User;
  rootPage:any = LandingPage;
  isLogedin : boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,public userProv: UserProvider , public event :Events, private notifyCtrl: NotificationsProvider) {
    platform.ready().then(() => {     
      this.event.subscribe('logedin',()=>{
        this.userProv.getUser().then(data=>{
          this.user = data;
          this.isLogedin = true;



        });



        
      })
                   
      if(platform.is('cordova')){
        console.log('this is cordova')
        //  this.notifyCtrl.init();
       
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}


