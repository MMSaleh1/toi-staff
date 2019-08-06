import { LandingPageModule } from './../pages/landing/landing.module';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';




import { MyApp } from './app.component';

import { RootProvider } from '../providers/root/root';
import { ItemsApiProvider } from '../providers/items-api/items-api';
import { UserProvider } from '../providers/user/user';
import { HomePageModule } from '../pages/home/home.module';
import { SigninPageModule } from '../pages/signin/signin.module';




import { Database } from '../providers/database/database';
import { CartProvider } from '../providers/cart/cart';
import { DetailsPageModule } from '../pages/details/details.module';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { HelperToolsProvider } from '../providers/helper-tools/helper-tools';




@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    SigninPageModule,
    DetailsPageModule,
    LandingPageModule,



    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RootProvider,
    ItemsApiProvider,
    UserProvider,
    Database,
    CartProvider,
    CallNumber,
    NotificationsProvider,
    OneSignal,
    HelperToolsProvider

  ]
})
export class AppModule {}
