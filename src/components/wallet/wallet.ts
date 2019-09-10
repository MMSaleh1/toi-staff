import { Component } from '@angular/core';

/**
 * Generated class for the WalletComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wallet',
  templateUrl: 'wallet.html'
})
export class WalletComponent {

  text: string;

  constructor() {
    console.log('Hello WalletComponent Component');
    this.text = 'Hello World';
  }

}
