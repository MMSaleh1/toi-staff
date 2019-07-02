import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AutoCompleteModule} from 'ionic2-auto-complete';


import { MyApp } from './app.component';

import { AppointmentPage } from '../pages/appointment/appointment';
import { RootProvider } from '../providers/root/root';
import { ItemsApiProvider } from '../providers/items-api/items-api';
import { UserProvider } from '../providers/user/user';
import { HomePageModule } from '../pages/home/home.module';
import { SigninPageModule } from '../pages/signin/signin.module';



import { Database } from '../providers/database/database';
import { CartProvider } from '../providers/cart/cart';



@NgModule({
  declarations: [
    MyApp,
    AppointmentPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    SigninPageModule,


    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AppointmentPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RootProvider,
    ItemsApiProvider,
    UserProvider,
    Database,
    CartProvider
  ]
})
export class AppModule {}
