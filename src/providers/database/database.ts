import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../items-api/items-api';
import { order } from '../user/user';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Database {

  orders : Array<order>;
  http:HttpClient;
  private static instance: Database = null;
  static isCreating: boolean = false;
  constructor() {
    if (!Database.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.orders =new Array();
      this.initialize();
    }
  }

  static getInstance() {
    console.log('Database Provider');
    if (Database.instance === null) {
      Database.isCreating = true;
      Database.instance = new Database();
      Database.isCreating = false;
    }
    return Database.instance;
  }


  private initialize() {
    //console.log('Initialize Database');
    //this.countries.push('مصر');
    let now = new Date();
    let day = 24 * 60 * 60 * 1000;
    
  }


}
