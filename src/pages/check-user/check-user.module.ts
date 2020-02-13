import { NgModule } from '@angular/core';
import { IonicPageModule  } from 'ionic-angular';
import { CheckUserPage } from './check-user';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CheckUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckUserPage),
    
    TranslateModule.forChild()
  ],

})
export class CheckUserPageModule {}
