import { Product } from './../items-api/items-api';
import { CartProvider } from './../cart/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RootProvider} from '../root/root';
import { Events } from 'ionic-angular';
import { e, P } from '@angular/core/src/render3';
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
  private getOrderItemActionString = "get_order_items?";
  private changeStatusActionString = "stuff_response_order?";
  private getStatusActionString = "get_all_order_states?";
  private getStuffOrderActionString = "get_stuff_orders?";
  private getAcceptedOrdersActionString = "get_stuff_accepted_orders?"
  private changeUserStatusActionString = "update_stuff_states?";
  private updateDeviceTokenActionString ="update_token_id?";



  public user: User;



  constructor(public http: HttpClient, public storage : Storage , public event : Events) {
    super(http);
  }

  public async loginNop(username:string,password:string): Promise<any>{
    return new Promise((resolve)=>{
      let temp = `${RootProvider.APIURL}${this.userApiController}${this.logInActionString}user_name=${username}&password=${password}`;
      
      this.http.get(temp).subscribe((data:any)=>{
        console.log(data[0]);
        if(data != null && data != undefined && data.length>0 && data[0].error_name !="wrong_password"){
        
          this.user = User.getInstance(data[0].id,data[0].name,data[0].password,data[0].mail,data[0].gender,data[0].phone,data[0].area_id);
          this.event.publish('logedin');
          console.log(this.user);
          resolve(true);
        }else{
          resolve(false)
        }
      })
    })
  }

  public async updateDeviceToken(user_id , device_id):Promise<any>{
    let temp =`${RootProvider.APIURL}${this.userApiController}${this.updateDeviceTokenActionString}user_id=${user_id}&token_id=${device_id}`;

    return new Promise((resolve)=>{
      this.http.get(temp).subscribe(data=>{
        if(data!= undefined){
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

  public async getorderItems(orderId: string):Promise<any>{
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getOrderItemActionString}order_id=${orderId}`;
    this.user = await this.getUser();
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        if(data == undefined || data.length == 0){
          resolve([])
        }else{
          console.log(data);
          let items = new Array<orderItem>();
          for(let i = 0 ; i < data.length;i++){
            if(data[i].stuff_id == this.user.id){
              items.push(new orderItem(data[i].product_name,data[i].cost,data[i].img1));
            }
           
          }
          resolve(items);

        }
      })
    })
  }

// 1 = avilable
// 0  = unavilable
  public async changeStaffStatus(stuff_id,value) :Promise<any>{
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.changeUserStatusActionString}stuff_id=${stuff_id}&value=${value}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        console.log(data);
        if(data !=undefined && data.length > 0 && data[0].id == stuff_id ){
          resolve(true)
          
        }else{
          resolve(false);
        }

      })

    })
  }

  public async getApprovedOrders(stuff_id:string): Promise<any>{
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getStuffOrderActionString}stuff_id=${stuff_id}`;
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        if(data == undefined || data.length == 0){
          resolve([])
        }else{
          let orders = new Array();
          for(let i =0;i<data.length; i++){
            orders.push( new order(data[i].order_id,data[i].user_name,data[i].phone,data[i].order_date,data[i].order_total,data[i].address,data[i].area_id,data[i].order_states_id));

          }
          resolve(orders);
        }
      })
    })
  }


  public async getAcceptedOrder(stuff_id:string): Promise<any>{
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getAcceptedOrdersActionString}stuff_id=${stuff_id}`;
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        if(data == undefined || data.length == 0){
          resolve(undefined)
        }else{
          let orders = new order(data[0].order_id,data[0].user_name,data[0].phone,data[0].order_date,data[0].order_total,data[0].address,data[0].area_id,data[0].order_states_id);
          
          resolve(orders);
        }
      })
    })
  }


  public async changeStatus(stuff_id,order_id,statusId): Promise<any>{
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.changeStatusActionString}stuff_id=${stuff_id}&order_id=${order_id}&status_id=${statusId}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        console.log(data);
        if(data == undefined || data.length == 0 ){
          resolve(false)
        }else{
          resolve(data);
        }
      })
    })
   

  }

  public async getAllStatus() :Promise<any>{
    let temp =`${RootProvider.APIURL}${this.userApiController}${this.getStatusActionString}`;
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any)=>{
        if(data == undefined || data.length == 0 ){
          resolve([])
        }else{
          let statuses = new Array<orderStatus>();
          for(let i =0 ;i <data.length ; i++){
            statuses.push(new orderStatus(data[i].id,data[i].states_name));
          }
          resolve(statuses);
        }
      })
    })

  }





  

  public async getUser():Promise<any>{
    return new Promise((resolve)=>{
      this.storage.get('toi-staff-user').then(data=>{
        if(data == undefined){
           resolve(User.getInstance());
        }else{
          let user = <User>data;
          resolve(User.getInstance(user.id,user.name,user.password,user.email,user.gender,user.image,user.areaId,user.deviceId));
           
        }
      });
    })
    
   
   
  }

  public async logout(){
      this.storage.remove('toi-staff-user');
  }
 
}

export class User {
  id: string;
  name: string;
  gender: string;
  password: string;
  email: string;
  phone: string;
  image : string; 
  areaId: string;
  deviceId: string;

  
  private static instance: User = null;
  static isCreating: boolean = false;
  

  constructor(id: string = "-1", name: string = "", gender: string = "Male", password: string = "", email: string = "", phone: string = "",area_id="",deviceId:string) {
   
    if (User.isCreating) {
      throw new Error("An Instance Of User Singleton Already Exists");
    } else {
      this.setData(id, name, password, email,gender, phone,area_id,deviceId);
      User.isCreating = true;
    }
  }

  public setData(id: string = "-1", name: string = "", password: string = "", email: string = "", gender: string = "Male", phone: string = "",area_id="",deviceId:string) {
    
    this.id = id;
    this.name = name;
    this.gender = gender
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.areaId = area_id;
    this.deviceId = deviceId;
  }

  static getInstance(id: string = "-1", name: string = "",  password: string = "", email: string = "",gender: string = "Male", phone: string = "",area_id="",deviceId:string='0') {
    if (User.isCreating === false && id !="-1") {
      //User.isCreating = false;
      User.instance = new User(id, name, gender, password, email, phone,area_id,deviceId);
      console.log(console.log(User.instance));
    }
    if (id != "-1") {
      User.instance.setData(id, name,password, email,gender, phone,area_id,deviceId);
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
  orderStatusId:string;
  areaId : string;
  
  constructor(id: string,
    customerName:string,
    customerPhone: string,
    orderDate: string,
    totalPrice: number,
    address: string,
    areaId : string,
    order_states_id ="1"
    ){
      this.id=id;
      this.customerName=customerName;
      this.customerPhone=customerPhone;
      this.orderDate= new Date(orderDate);
      this.totalPrice=totalPrice;
      this.address=address;
      this.areaId=areaId;
      this.orderStatusId = order_states_id;
    }
}
export class orderItem{
  productName: string;
  cost: number;
  imagUrl: string;

  constructor(ProductName,cost,imageUrl){ 
    this.productName = ProductName;
    this.cost = cost;
    this.imagUrl =  ImageProcess.getImageUrl(imageUrl);
  }


}


export class ImageProcess{

  constructor(){

  }

  static getImagesUrl(images : Array<string>){
    for(let i = 0 ; i < images.length ; i++){
      images[i] = this.getImageUrl(images[i]);
    }
    return images;
  }

  static getImageUrl(image:string){
    let baseString = RootProvider.ImagesUrl;
    image =image.slice(1,image.length);
    return baseString+image;
  }
}


export class orderStatus{
  id : string ; 
  name : string;
  constructor(id , name){
    this.id = id;
    this.name = name;
  }
}




