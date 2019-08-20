import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public http: HttpClient, public oneSignal: OneSignal ,public platform :Platform) {
    console.log('Hello NotificationsProvider Provider');
  }

  public init() {
    this.oneSignal.startInit('75a74ea9-311c-4ec7-a0ee-2b7b04c14404', '440781592056');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }


  
  public async getDeviceId(){
    if(this.platform.is('cordova')){
      let data = await this.oneSignal.getIds();
    return data.userId;
    }else{
      return '0';
    }

    
  }


}
