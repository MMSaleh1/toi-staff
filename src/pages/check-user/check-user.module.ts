import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckUserPage } from './check-user';

@NgModule({
  declarations: [
    CheckUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckUserPage),
  ],
})
export class CheckUserPageModule {}
