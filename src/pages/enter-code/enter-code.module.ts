import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterCodePage } from './enter-code';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EnterCodePage,
  ],
  imports: [
    IonicPageModule.forChild(EnterCodePage),
    TranslateModule.forChild(),

  ],
})
export class EnterCodePageModule {}
