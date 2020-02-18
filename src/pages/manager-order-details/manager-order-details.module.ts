import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerOrderDetailsPage } from './manager-order-details';

@NgModule({
  declarations: [
    ManagerOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerOrderDetailsPage),
  ],
})
export class ManagerOrderDetailsPageModule {}
