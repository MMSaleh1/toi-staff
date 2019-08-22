import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastController, LoadingController, Loading, AlertController, ActionSheetController, App, MenuController, Platform } from 'ionic-angular';
// import { SharedClass } from '../sharedClass';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
// import { LaunchNavigator } from '@ionic-native/launch-navigator';
// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
// import { SharedClass } from '../SharedClass';
declare var google;

@Injectable()
export class HelperToolsProvider {

  currentUserPosition = { lat: 0, lng: 0 };
  AllCountries;
  CurrentUserCountry = 'Egypt';
  SelectedTab = 0;
  public readonly ToastPosition = { Top: 'top', Middle: 'middle', Buttom: 'buttom' }
  private loading: Loading;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    //private launchNavigator: LaunchNavigator,
    //private camera: Camera,
    private translate: TranslateService,
    private geolocation: Geolocation,
    private storage: Storage,
    //private geocoder: NativeGeocoder,
    private actionsheetCtrl: ActionSheetController,
    private app: App,
    private menuController: MenuController,
    private platform: Platform
  ) {
    console.log('Hello HellperToolsProvider Provider');
  }
  //// Toast Helper Tools
  /////////////////////////////////////////////////////SHOW TOAST ONLY/////////////////////////////////////////////////////

  showToast(position: string, message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
    });
    toast.present(toast);
  }
  /////////////////////////////////////////////////////SHOW TOAST WITH CLOSE BTN//////////////////////////////////////////////
  showToastWithCloseButton(position: string, message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: position,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  /////////////////////////////////////////////////////SHOW LOADING ONLY////////////////////////////////////////////////////
  ShowLoadingSpinnerOnly() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">
            <img src="assets/imgs/loading.svg" width="100" height="100">
          </div>
        </div>`,
    });
    return this.loading.present();
  }
  /////////////////////////////////////////////////////SHOW LOADING WITH TXT////////////////////////////////////////////////////

  ShowLoadingWithText(text: string) {
    this.loading = this.loadingCtrl.create({
      content: text,
    });
    this.loading.present();
  }
  /////////////////////////////////////////////////////NAVIGATE TO MAP////////////////////////////////////////////////////

  // NavigateToMap(LATIT, LONGIT) {
  //   return this.launchNavigator.navigate([parseFloat(LATIT), parseFloat(LONGIT)]);
  // }
  /////////////////////////////////////////////////////DISMISS LOADING IF EXISISTS////////////////////////////////////////////

  DismissLoading() {
    if (this.loading) {
      this.loading.dismissAll();
    }
  }
  /////////////////////////////////////////////////////SHOW ALERT WITH OKAY BTN////////////////////////////////////////////

  showAlertWithOkButton(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Done']
    });
    return alert.present();
  }
  /////////////////////////////////////////////////////SHOW ALERT FOR GPS AND REFRESH HOME////////////////////////////////////////////
  ShowCustomAlertForHome(title: string, message: string, RefreshChcekingForGPS) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Refresh',
        handler: RefreshChcekingForGPS
      }],
      enableBackdropDismiss: false
    });
    return alert.present();
  }

  /////////////////////////////////////////////////////SHOW BAD REQ ALERT////////////////////////////////////////////

  ShowBadRequestErrorAlert() {
    return new Promise((resolve, reject) => {
      this.translate.get(['Error', 'CannotResolveProccessPleaseTryAgin']).subscribe(_val => {
        this.showAlertWithOkButton(_val['Error'], _val['CannotResolveProccessPleaseTryAgin']).then(__ => {
          resolve(__);
        }).catch(err => {
          reject(err);
        })
      }, err => {
        reject(err);
      })
    });
  }

  /////////////////////////////////////////////////////SHOW ACCESS DENIED ALERT////////////////////////////////////////////

  ShowPremesionDeniedAlret() {
    return this.ShowAlertWithTranslation('ErrorTitle', 'AccessDenied');
  }
  //////////////////////////////////////////////////////SHOW ALERT WITH TRANSLATION////////////////////////////////////////////
  ShowAlertWithTranslation(title, message) {
    return new Promise((resolve, reject) => {
      this.translate.get([title, message, 'Done']).subscribe(res => {
        let alert = this.alertCtrl.create({
          title: res[title],
          subTitle: res[message],
          buttons: [res['Done']]
        });
        alert.present().then(__ => {
          resolve(__)
        }).catch(err => {
          reject(err);
        })
      })
    })
  }
  //////////////////////////////////////////////////////CAMERA HANDLING //////////////////////////////////////////////////////

  // End alert Functions
  ///////////////////////////////////////////////////
  // CameraLoadPhoto() {
  //   const options = {
  //     quality: 75,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     //maximumImagesCount: 4,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //   };
  //   return this.camera.getPicture(options);
  // }
  // // Load Photo from Gallery
  // GalleryLoadPhoto() {
  //   const options = {
  //     quality: 75,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     //maximumImagesCount: 4,
  //     //sourceType: this.camera.PictureSourceType.CAMERA,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //   };
  //   return this.camera.getPicture(options);
  // }
  // OpenImage() {
  //   return new Promise((resolve, reject) => {
  //     let actionsheet = this.actionsheetCtrl.create({
  //       title: 'تحميل صورة',
  //       buttons: [
  //         {
  //           text: 'Pictures',
  //           icon: 'images',
  //           handler: () => {
  //             this.GalleryLoadPhoto().then(DataURI => {
  //               resolve(DataURI);
  //             }).catch(err => {
  //               reject(err)
  //             });
  //           }
  //         },
  //         {
  //           text: 'Camera',
  //           icon: 'camera',
  //           handler: () => {
  //             this.CameraLoadPhoto().then(URI => {
  //               resolve(URI);
  //             }).catch(err => {
  //               reject(err);
  //             })
  //           }
  //         },
  //         {
  //           text: 'الغاء',
  //           role: 'cancel',
  //           handler: () => {
  //             reject('cancel');
  //           }
  //         }
  //       ]
  //     });
  //     actionsheet.present();
  //   })

  // }
  ////////////////////////////////////////////////////////IF DRIVIER APP ////////////////////////////////////////////////////////
  GetTimeTrip(Origin, Destination) {
    return new Promise((resolve, reject) => {
      this.calculateDistances([Origin], [Destination]).then(data => {
        var results = data['rows'][0].elements;
        var element = results[0];
        resolve(element);
      }, error => {
        reject(error);
      });
    });
  }
  calculateDistances(origins, destinations) {
    var service = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origins],
          destinations: [destinations],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        },
        function (response, status) {
          if (status != google.maps.DistanceMatrixStatus.OK) {
            reject(status);
          } else {
            resolve(response);
          }
        });
    });
  }
  //////////////////////////////////////////////////////SHOW PLEASE LOGIN ALERT///////////////////////////////////////////////////
  ShowPleaseLoginAlert() {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        title: 'تنيه',
        message: 'يجب عليك ان تسجل الدخول كمستخدم عادي قبل ان تتم هذه العمليه',
        buttons: [{
          text: 'الغاء',
          handler: () => {
            reject('cancel')
          }
        }, {
          text: 'تسجيل الأن',
          handler: () => {
            resolve('goTo Login');
          }
        }]
      }).present();
    })
  }
  //////////////////////////////////////////////////////SHOW EXIT ALERT FROM APP///////////////////////////////////////////////////

  ShowExitAlert() {
    return new Promise((resolve, reject) => {
      this.translate.get(['confirm', 'DoYouWantToExit', 'cancel']).subscribe(values => {
        let cssClassName = this.translate.currentLang == 'ar' ? 'AppAlertarabic' : 'AppAlertEnglish';
        let alert = this.alertCtrl.create({
          title: values['confirm'],
          message: values['DoYouWantToExit'],
          cssClass: cssClassName,
          buttons: [
            {
              text: values['Cancel'],
              role: 'cancel',
              handler: () => {
                reject('err');
              }
            },
            {
              text: values['confirm'],
              handler: () => {
                resolve('done');
              }
            }]
        })
        alert.present();
      })
    })
  }
  ///////////////////////////////////////////////REMEMBER USER FUNCTION(NOT FREQ USED(TOKEN PREFERED))///////////////////////////////////////
  RemeberUser(username, password) {
    return new Promise((resolve, reject) => {
      this.storage.set('Username', username).then(__ => {
        this.storage.set('password', password).then(__ => {
          resolve(__);
        }).catch(err => {
          reject(err);
        })
      }).catch(err => {
        reject(err);
      })
    });
  }
  //////////////////////////////////////////////////////GET THE SAVED APP LANG IF MULTI //////////////////////////////////////////////////////

  GetUserSavedLanguage() {
    return new Promise((resolve, reject) => {
      this.storage.get('Language').then(UserLan => {
        if (UserLan) {
          let USerLanguge = {
            'userLan': UserLan
          }
          resolve(USerLanguge);
        } else {
          reject('language dose not exist');
        }
      })
    })
  }
  //////////////////////////////////////////////////////INTIALIZE USER CURRENT POS //////////////////////////////////////////////////////
  IntializeUSerCurrentPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then(userPOS => {
        this.currentUserPosition.lat = userPOS.coords.latitude;
        this.currentUserPosition.lng = userPOS.coords.longitude;
        resolve(this.currentUserPosition);
      }).catch(err => {
        reject(err);
      });
    })
  }
  // //////////////////////////////////// REGISTER BACKBUTTON FUNCTION ////////////////////
  onRegisterBackButtonFunction() {
    const overlay = this.app._appRoot._overlayPortal.getActive();
    if (overlay && overlay.dismiss) {
      overlay.dismiss();
    }
    else if (this.menuController.isOpen()) {
      this.menuController.close()
    }
    else if (this.app.getActiveNavs()[0] && this.app.getActiveNavs()[0].getActive().index == 0) {
      this.ShowExitAlert().then(__ => {
        this.platform.exitApp();
      }).catch(__ => {

      });
    } else {
      let nav = this.app.getActiveNavs()[0];
      let view = nav.getActive().instance.pageName;
      console.log(view);
      if (view == 'ImageModal') {
        nav.getActive().dismiss();
      } else {
        this.app.getActiveNavs()[0].pop();
      }
    }
  }
}
