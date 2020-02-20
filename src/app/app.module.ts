import { LandingPageModule } from './../pages/landing/landing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { SignupPageModule } from '../pages/signup/signup.module';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from "@ionic-native/diagnostic";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";




import { MyApp } from './app.component';

import { RootProvider } from '../providers/root/root';
import { ItemsApiProvider } from '../providers/items-api/items-api';
import { UserProvider } from '../providers/user/user';
import { HomePageModule } from '../pages/home/home.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { EnterCodePageModule } from '../pages/enter-code/enter-code.module';
import { LaunchNavigator } from '@ionic-native/launch-navigator';



import { Database } from '../providers/database/database';
import { CartProvider } from '../providers/cart/cart';
import { DetailsPageModule } from '../pages/details/details.module';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { HelperToolsProvider } from '../providers/helper-tools/helper-tools';
import { UpdateProfilePageModule } from '../pages/update-profile/update-profile.module';
import { OrderDetailsPageModule } from '../pages/order-details/order-details.module';
import { HistoryPageModule } from '../pages/history/history.module';
import { LocationProvider } from '../providers/location/location';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { WalletComponent } from '../components/wallet/wallet';
import { CheckUserPage } from '../pages/check-user/check-user';
import { CheckUserPageModule } from '../pages/check-user/check-user.module';

import { FCM } from '@ionic-native/fcm';
import { ManagerHomePageModule } from '../pages/manager-home/manager-home.module';
import { ManagerOrderDetailsPageModule } from '../pages/manager-order-details/manager-order-details.module';
import { ManagerStylistAssignmentComponent } from '../components/manager-stylist-assignment/manager-stylist-assignment';
import { UserPointsPageModule } from '../pages/user-points/user-points.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    MyApp,
    WalletComponent,
    ManagerStylistAssignmentComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
    }),
    IonicStorageModule.forRoot({ name: "appname" }),
    HttpClientModule,
    HomePageModule,
    SigninPageModule,
    DetailsPageModule,
    LandingPageModule,
    OrderDetailsPageModule,
    SignupPageModule,
    EnterCodePageModule,
    UpdateProfilePageModule,
    HistoryPageModule,
    CheckUserPageModule,
    ManagerHomePageModule,
    ManagerOrderDetailsPageModule,
    UserPointsPageModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',      
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WalletComponent,
    ManagerStylistAssignmentComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RootProvider,
    ItemsApiProvider,
    UserProvider,
    Database,
    LaunchNavigator,
    CartProvider,
    CallNumber,
    Diagnostic,
    OpenNativeSettings,
    NotificationsProvider,
    Geolocation,
    BackgroundGeolocation,
    HelperToolsProvider,
    Camera, 
    LocationProvider,
    FCM

  ]
})
export class AppModule { }
