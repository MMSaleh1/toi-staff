import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailsPage } from './order-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailsPage),
    TranslateModule.forChild(),

  ],
})
export class OrderDetailsPageModule { }
