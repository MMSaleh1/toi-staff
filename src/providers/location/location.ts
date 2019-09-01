import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';


/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(public http: HttpClient,
    private backgroundGeolocation: BackgroundGeolocation) {
    console.log('Hello LocationProvider Provider');
  }

  // startTracking() {
  //   const config: BackgroundGeolocationConfig = {
  //     desiredAccuracy: 0,
  //     stationaryRadius: 20,
  //     distanceFilter: 10,
  //     debug: false,
  //     interval: 1000
  //   };
  //   this.backgroundGeolocation.configure(config).subscribe((location) => {

  //     console.log(location);

  //     // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
  //     // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
  //     // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
  //     // this.backgroundGeolocation.start(); // FOR IOS ONLY

      
  //     this.io.socket.post('/driver/position', { driver_id: this.UserData['driver'].id, lat: location.latitude, lng: location.longitude }, (body, JWR) => {
  //       console.log(body)
  //       if (body['status'] == 'success') {
  //         console.log('tracking Driver')
  //         console.log(body)
  //       }
  //       else {
  //         console.log('err tracking Driver')
  //       }
  //     })
  //   }, (err) => {
  //     console.log(err);
  //   });
  //   this.backgroundGeolocation.start(); // FOR IOS ONLY
  // }


}
