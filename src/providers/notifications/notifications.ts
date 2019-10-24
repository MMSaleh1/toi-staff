import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public http: HttpClient, private fcm: FCM,public platform :Platform) {
    console.log('Hello NotificationsProvider Provider');
  }

  public async init() :Promise<any> {

    this.fcm.subscribeToTopic('all_users');
    this.fcm.onNotification().subscribe(data => {

      console.log(data);
    });

    // this.fcm.onTokenRefresh().subscribe(token => {
    // });

  }


  
  public async getDeviceId():Promise<any> {
    return new Promise((resolve)=>{
      this.fcm.getToken().then(token => {
        console.log(token)
        resolve(token);
      },);
  
    })
  }


}
