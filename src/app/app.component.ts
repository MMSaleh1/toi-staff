import { LandingPage } from './../pages/landing/landing';
import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
 
import { UserProvider, User } from './../providers/user/user';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public user : User;
  rootPage:any = LandingPage;
  isLogedin : boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,public userProv: UserProvider , public event :Events, public backGround : BackgroundMode , public notifications : LocalNotifications) {
    platform.ready().then(() => {
      this.backGround.enable();      
      this.event.subscribe('logedin',()=>{
        this.userProv.getUser().then(data=>{
          this.user = data;
          if(this.backGround.isEnabled() == true){
            this.backGround.on('activate').subscribe(()=>{
              this.checkAcceptedOrder();
            })
          }
         
          this.isLogedin = true;
        });
        
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public async checkAcceptedOrder(){
    let order = await this.userProv.getAcceptedOrder(this.user.id);
    console.log(order);
    if(order == undefined){
      setTimeout(() => {
        this.checkAcceptedOrder()
      },1000);
    }else{
      this.notifications.schedule({
        text : "You Just reseved An Order"
      })
    }
  }

}


