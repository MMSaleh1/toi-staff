import { Component } from '@angular/core';
import { ViewController, AlertController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ManagerStylistAssignmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'manager-stylist-assignment',
  templateUrl: 'manager-stylist-assignment.html'
})
export class ManagerStylistAssignmentComponent {
  public StylistArr :Array<any>;
  public StylistViewArr : Array<any>;
  public viewReady =false;
  constructor(private viewCtrl : ViewController, private userCtrl :UserProvider ,private alertCtrl : AlertController,private events : Events) {
    console.log('Hello ManagerStylistAssignmentComponent Component');
    this.StylistArr = new Array();
  }

  async ionViewDidLoad(){
     this.StylistArr = await this.userCtrl.getAllStaff();
     this.StylistViewArr = this.StylistArr;
     this.viewReady = true;
     console.log(this.StylistViewArr);
  }
  close() {
    this.viewCtrl.dismiss();
  }
  selectStyilst(stylist){
    let alert  =  this.alertCtrl.create({
      title : 'assign stylist',
      message : `Do you want to assign this item to ${stylist.name} `,
      buttons : [
        {
          text: 'cancel',
          role: 'cancel'
      },
      {
        text: 'confirm',
        role: 'ok',
        handler:  ()=> {
         this.events.publish('stylistSelected',stylist);
         this.viewCtrl.dismiss();
        }
      }
      ]
    })
    
    alert.present();
  }

  public searchStylist(event){
    let value = event.target.value;
    if (value && value.trim() != '') {

      this.StylistViewArr = this.StylistArr.filter((item) => {
        return (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      });

    } else {
      this.StylistViewArr = this.StylistArr;
    }
  }

}
