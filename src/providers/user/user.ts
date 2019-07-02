import { CartProvider } from './../cart/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RootProvider} from '../root/root';
import { Events } from 'ionic-angular';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {

  private userApiController:string = 'stuff/';
  
  private logInActionString = "stuff_login?";
  private getAllOrdersActionString = "get_orders_for_stuff_mob?";


  public user: User; 



  constructor(public http: HttpClient, public storage : Storage , public event : Events) {
    super(http);
  }

  public async loginNop(username:string,password:string): Promise<any>{
    return new Promise((resolve)=>{
      let temp = `${RootProvider.APIURL}${this.userApiController}${this.logInActionString}user_name=${username}&password=${password}`;
      console.log(temp);
      this.http.get(temp).subscribe((data:any)=>{
        console.log(data[0]);
        if(data != null && data != undefined && data.length>0){
          console.log(data[0].id+ "  : "+data[0].name+"  :  "+data[0].password+"  :  "+data[0].mail)
          this.user = User.getInstance(data[0].id,data[0].name,data[0].password,data[0].mail,data[0].gender,data[0].phone);
          this.event.publish('logedin');
          console.log(this.user);
          resolve(true);
        }else{
          resolve(false)
        }
      })
    })
  }
  public async getAllOrders(gender:any) : Promise<any>{
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getAllOrdersActionString}emp_gender=${gender}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        console.log(data);
        if(data == undefined || data.length == 0){
          resolve([])
        }else{
          let orders = new Array<order>();
          for(let i =0;i<data.length;i++){
            orders.push(new order(data[i].order_id,data[i].name,data[i].phone,data[i].order_date,data[i].order_total,data[i].address,data[i].area_id));
          }
          console.log(orders);
          resolve(orders);

        }
      })
    })
  }





  

  public getUser(){
    return User.getInstance();
  }






  // public removeAddress(address : Address){
  //   this.user.removeSavedAddress(address);
  //   this.storage.set('user',this.user);
  // }


}

export class User {
  id: string;
  name: string;
  fName:string;
  lName:string;
  gender: string;
  password: string;
  email: string;
  phone: string;
  image : string; 

  
  private static instance: User = null;
  static isCreating: boolean = false;

  constructor(id: string = "-1", name: string = "", gender: string = "Male", password: string = "", email: string = "", phone: string = "",lName :string ="",fName: string = "") {
   
    if (User.isCreating) {
      throw new Error("An Instance Of User Singleton Already Exists");
    } else {
      this.setData(id, name, password, email,gender, phone);
      User.isCreating = true;
    }
  }

  public setData(id: string = "-1", name: string = "", password: string = "", email: string = "", gender: string = "Male", phone: string = "") {
    
    this.id = id;
    this.name = name;
    this.gender = gender
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  static getInstance(id: string = "-1", name: string = "",  password: string = "", email: string = "",gender: string = "Male", phone: string = "",fName:string="",lName:string="") {
    if (User.isCreating === false && id !="-1") {
      //User.isCreating = false;
      User.instance = new User(id, name, gender, password, email, phone,lName,fName);
      console.log(console.log(User.instance));
    }
    if (id != "-1") {
      User.instance.setData(id, name,password, email,gender, phone);
    }
    return User.instance;
  }






}


export class order{
  id: string;
  customerName:string;
  customerPhone: string;
  orderDate: Date;
  totalPrice: number;
  address: string;
  areaId : string;
  constructor(id: string,
    customerName:string,
    customerPhone: string,
    orderDate: string,
    totalPrice: number,
    address: string,
    areaId : string){
      this.id=id;
      this.customerName=customerName;
      this.customerPhone=customerPhone;
      this.orderDate= new Date(orderDate);
      this.totalPrice=totalPrice;
      this.address=address;
      this.areaId=areaId;
    }
}



