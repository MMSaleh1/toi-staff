import { Product } from './../items-api/items-api';
import { CartProvider } from './../cart/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RootProvider } from '../root/root';
import { Events } from 'ionic-angular';
import { e, P } from '@angular/core/src/render3';
import { HelperToolsProvider } from '../helper-tools/helper-tools';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {

  private userApiController: string = 'stuff/';

  private logInActionString = "stuff_login?";
  private updateStaffActionString = "edit_stuf_mob/"

  private getOrderItemActionString = "get_order_items_mob?";
  private changeStatusActionString = "stuff_response_order?";
  private getStatusActionString = "get_all_order_states?";

  private getAcceptedOrdersActionString = "get_stuff_accepted_orders?"
  private changeUserStatusActionString = "update_stuff_states?";
  private updateDeviceTokenActionString = "update_stuff_token_id?";

  private checkStaffRegestrationCode = "check_stuff_reg_code?"

  private registerStaffActionString = "stuff_reg?";

  private getStaffHistoryActionString = "get_stuff_orders?"


  private walletApiController = "wallet/";
  private changeWalletActionString = "add_change_wallet?";

  private managerApiController = "branch_manager/";
  private managerLoginActionString = "branch_manager_login?";
  private managergetStaffActionString = "get_stuf_for_branch_managers";
  private managerUpdateOrderItemActionString ="add_stuff_to_order_item?";
  private managerChangeOrderStatusActionString ="change_order_state?";


  public user: User;

  available;
  queue;

  constructor(public http: HttpClient, public storage: Storage, public event: Events, public helperTools: HelperToolsProvider) {
    super(http);
  }

  public async loginNop(username: string, password: string): Promise<any> {


    return (await this.loginStaff(username,password)) == true ? true :(await this.loginManager(username,password)) == true ? true : false;
  }


  private loginStaff(username: string, password: string) : Promise<any>{
    return new Promise((resolve) => {
      let temp = `${RootProvider.APIURL}${this.userApiController}${this.logInActionString}user_name=${username}&password=${password}`;

      this.http.get(temp).subscribe((data: any) => {
        console.log(data[0]);
        if (data != null && data != undefined && data.length > 0 && data[0].error_name != "wrong_password") {

          // let image = ImageProcess.getImageUrl(data[0].img);
          let stylist = new Stylist(data[0].id, data[0].name, data[0].password,  data[0].gender,data[0].mail, data[0].phone, data[0].area_id, data[0].device_id, data[0].user_name, data[0].available, data[0].queue, data[0].img);
          this.user = new User('stylist' , stylist);
          
          this.saveUser(this.user).then(()=>{
            console.log(this.user);
            resolve(true);
          });
        } else {
          resolve(false)
        }
      })
    })
  }

  private loginManager(username: string, password: string) : Promise<any>{
    return new Promise((resolve) => {
      let temp = `${RootProvider.APIURL}${this.managerApiController}${this.managerLoginActionString}user_name=${username}&password=${password}`;

      this.http.get(temp).subscribe((data: any) => {
        console.log(data[0]);
        if (data != null && data != undefined && data.length > 0 && data[0].error_name != "wrong_password") {

          // let image = ImageProcess.getImageUrl(data[0].img);
          let manager = new Manager(data[0].id,data[0].user_name,data[0].password,data[0].vendor_id,data[0].branch_id,data[0].name,data[0].phone,data[0].device_id);
          this.user = new User('manager' , manager);
          this.saveUser(this.user).then(()=>{
            console.log(this.user);
            resolve(true);
          });
        
        } else {
          resolve(false)
        }
      })
    })
  }


  public async registration(name, phone, password, img, gender, user_name, branch_id, deviceId): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.registerStaffActionString}name=${name}&phone=${phone}&password=${password}&img=${img}&gender=${gender}&user_name=${user_name}&branch_id=${branch_id}&device_id=${deviceId}`;
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        console.log(data);
        this.helperTools.ShowLoadingSpinnerOnly();
        if (data == undefined || data.length == 0) {
          resolve([]);
        } else {
          const stylist = new Stylist(data[0].ID, name, password, "", gender, phone, branch_id, deviceId, user_name, '1', '0', img)
          this.user = new User('stylist' , stylist);
          console.log(this.user);
          this.saveUser(this.user).then(() => {
            console.log(this.user);
            this.event.publish('logedin');
            console.log(this.user);
            resolve(this.user);
          });

        }
      })
    })

  }

  public async updateDeviceToken(user_id, device_id): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.updateDeviceTokenActionString}stuff_id=${user_id}&token_id=${device_id}`;

    return new Promise((resolve) => {
      this.http.get(temp).subscribe(data => {
        if (data != undefined) {
          resolve(true);
        } else {
          resolve(false)
        }

      })
    })


  }

  public async updateStylist(user: User): Promise<any> {
    let stylistData = user.stylist;
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.updateStaffActionString}${stylistData.id}?name=${stylistData.name}&phone=${stylistData.phone}&password=${stylistData.password}&img=${stylistData.image}&gender=${stylistData.gender}&user_name=${stylistData.userName}&national_id=""&available=${stylistData.available}&queue=${stylistData.queue}&day_off=0`;
    console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe(data => {
        if (data == undefined) {
          resolve(false)
        } else {
          resolve(true)
          this.saveUser(user).then(() => {
            this.getUser();
            this.event.publish('user-updates');
          }
          );
        }
      })
    })

  }

  public async checkCode(code): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.checkStaffRegestrationCode}code=${code}`;
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        if (data == undefined || data.length == 0) {
          resolve([])
        } else {
          resolve(data);
        }
      })
    })
  }




  public sendImage(image: string): Promise<any> {
    return new Promise((resolve) => {
      // let header = new HttpHeaders({ 'Content-Type': 'application/json', "Accept": 'application/json' });
      // header.set();
      //header.append("Accept", 'application/json');
      //header.append();
      // let body = {
      //   'ImgStr': image
      // }

      console.log((image));
      // console.log(JSON.stringify(body));
      this.http.post(`${RootProvider.APIURL}/test_upload/SaveImage_staff`, { image: image }).subscribe(data => {
        //  console.log(image);
        //  alert(data);
        resolve(data);
      }, err => {
        console.log(err);
      })
    })

  }


  // public async getAllOrders(gender:any) : Promise<any>{
  //   let temp = `${RootProvider.APIURL}${this.userApiController}${this.getAllOrdersActionString}emp_gender=${gender}`;
  //   console.log(temp);
  //   return new Promise((resolve)=>{
  //     this.http.get(temp).subscribe((data:any)=>{
  //       console.log(data);
  //       if(data == undefined || data.length == 0){
  //         resolve([])
  //       }else{
  //         let orders = new Array<order>();
  //         for(let i =0;i<data.length;i++){
  //           orders.push(new order(data[i].order_id,data[i].name,data[i].phone,data[i].order_date,data[i].order_total,data[i].address,data[i].area_id));
  //         }
  //         console.log(orders);
  //         resolve(orders);

  //       }
  //     })
  //   })
  // }

  public async getorderItems(orderId: string): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getOrderItemActionString}order_id=${orderId}`;
    this.user = await this.getUser();
    // console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        if (data == undefined || data.length == 0) {
          resolve([])
        } else {
          console.log(data);
          let items = new Array<orderItem>();
          if(this.user.stylist != undefined){
            for (let i = 0; i < data.length; i++) {
              if (data[i].stuff_id == this.user.stylist.id) {
                let name = data[i].is_product == '0' ? data[i].service_name : data[i].sale_prduct_name;
                let cost = data[i].is_product == '0' ? data[i].service_cost : data[i].sale_prduct_cost;
                items.push(new orderItem(data[i].id,name, cost, data[i].name, data[i].is_product, data[i].phone, data[i].stuff_img,data[i].stuff_id, data[i].quntity) );
              }
  
            }
          }else{
            for (let i = 0; i < data.length; i++) {
                let name = data[i].is_product == '0' ? data[i].service_name : data[i].sale_prduct_name;
                let cost = data[i].is_product == '0' ? data[i].service_cost : data[i].sale_prduct_cost;
                items.push(new orderItem(data[i].id,name, cost, data[i].name, data[i].is_product, data[i].phone, data[i].stuff_img,data[i].stuff_id , data[i].quntity));
            }
          }
          
          resolve(items);

        }
      })
    })
  }



  public async changeUserWallet(order_id, staffId, amount, reson, user_id): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.walletApiController}${this.changeWalletActionString}order_id=${order_id}&stuff_id=${staffId}&amount=${amount}&reson=${reson}&user_id=${user_id}`;
    console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe(data => {
         console.log(data);
        if (data != undefined) {
          this.event.publish("toHome");
          resolve(data);
          
        } else {
          resolve(null);
        }
      })
    })
  }


  // 1 = avilable
  // 0  = unavilable
  public async changeStaffStatus(stuff_id, ava, queue): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.changeUserStatusActionString}stuff_id=${stuff_id}&available=${ava}&queue=${queue}`;
    console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        console.log(data);
        if (data != undefined && data.length > 0 && data[0].id == stuff_id) {
          resolve(true)

        } else {
          resolve(false);
        }

      })

    })
  }

  // public async getApprovedOrders(stuff_id:string): Promise<any>{
  //   let temp = `${RootProvider.APIURL}${this.userApiController}${this.getStuffOrderActionString}stuff_id=${stuff_id}`;
  //   return new Promise((resolve)=>{
  //     this.http.get(temp).subscribe((data:any)=>{
  //       if(data == undefined || data.length == 0){
  //         resolve([])
  //       }else{
  //         let orders = new Array();
  //         for(let i =0;i<data.length; i++){
  //           orders.push( new order(data[i].order_id,data[i].user_name,data[i].phone,data[i].order_date,data[i].order_total,data[i].address,data[i].area_id,data[i].order_states_id));

  //         }
  //         resolve(orders);
  //       }
  //     })
  //   })
  // }

  public async getHistory(staffId): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getStaffHistoryActionString}stuff_id=${staffId}`;
    console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        if (data == undefined || data.length == 0) {
          resolve([])
        } else {
          let orders = new Array<order>();
          for (let i = 0; i < data.length; i++) {
            orders.push(new order(data[i].order_id, data[i].user_name, data[i].phone, data[i].order_date, data[i].order_total, data[i].address, data[i].area_id, data[i].order_states_id, data[i].user_tokenid, data[i].long, data[i].latt, data[i].user_id, data[i].user_img,data[0].wallet,  data[i].more_info,data[i].wallet_used));
          }
          console.log(orders);
          resolve(orders);
        }
      })
    })
  }


  public async getAcceptedOrder(stuff_id: string): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getAcceptedOrdersActionString}stuff_id=${stuff_id}`;
    console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        if (data == undefined || data.length == 0) {
          resolve(undefined)
        } else {
          let orderCounter = 1;
          let orders = new Array<order>();
          orders.push(new order(data[0].order_id, data[0].user_name, data[0].phone, data[0].order_date, data[0].order_total, data[0].address, data[0].area_id, data[0].order_states_id, data[0].user_tokenid, data[0].long, data[0].latt, data[0].user_id, data[0].user_img,data[0].wallet, data[0].more_info,data[0].wallet_used));
          for (let i = 1; i < data.length; i++) {
            if (data[i].order_id != data[i - 1].order_id) {
              orderCounter++
              orders.push(new order(data[i].order_id, data[i].user_name, data[i].phone, data[i].order_date, data[i].order_total, data[i].address, data[i].area_id, data[i].order_states_id, data[i].user_tokenid, data[i].long, data[i].latt, data[i].user_id, data[i].user_img,data[i].wallet, data[i].more_info,data[i].wallet_used));

            }
          }
          console.log(orderCounter)
          if (1 < orderCounter) {
            this.available = 0;
            this.queue = 1;
          }
          else if (orderCounter == 1) {
            this.available = 0;
            this.queue = 0;
          }
          else if (orderCounter == 0) {
            this.available = 1;
            this.queue = 0;
          }
          console.log(this.available)
          console.log(this.queue);
          console.log(orders);
          this.changeStaffStatus(stuff_id, this.available, this.queue);
          resolve(orders);
        }
      })
    })
  }



  // public updateStatus(staffId : string) :Promise<any>{
  //   let temp =`${RootProvider.APIURL}${this.userApiController}${this.updateStaffStateActionString}stuff_id=${staffId}&available=${this.available}&queue=${this.queue}`;
  //   console.log(temp);
  //   return new Promise((resolve)=>{
  //     this.http.get(temp).subscribe((data : any)=>{
  //       console.log(data);
  //       resolve(data);
  //     })
  //   })
  // }


  public async changeStatus(stuff_id, order_id, statusId, userToken, user_id, arrive_time): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.changeStatusActionString}stuff_id=${stuff_id}&order_id=${order_id}&status_id=${statusId}&user_token=${userToken}&user_id=${user_id}&arrive_time=${arrive_time}`;
    console.log(temp);
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        console.log(data);
        if (data == undefined || data.length == 0) {
          resolve(false)
        } else {
          resolve(data);
        }
      })
    })


  }

  public async getAllStatus(): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.userApiController}${this.getStatusActionString}`;
    return new Promise((resolve) => {
      this.http.get(temp).subscribe((data: any) => {
        if (data == undefined || data.length == 0) {
          resolve([])
        } else {
          let statuses = new Array<orderStatus>();
          for (let i = 0; i < data.length; i++) {
            statuses.push(new orderStatus(data[i].id, data[i].states_name));
          }
          resolve(statuses);
        }
      })
    })

  }

  public getAllStaff() :Promise<any>{
    const url = `${RootProvider.APIURL}${this.managerApiController}${this.managergetStaffActionString}`;
    return new Promise((resolve)=>{
      this.http.get(url).subscribe((data :Array<any>)=>{
        // console.log(data);
        if(data == undefined){
          resolve([])
        }else{
          for(let i =0 ; i<data.length; i++){
            data[i].order_items_counter = data[i].order_items_counter == undefined ? 0 : data[i].order_items_counter;
          }
          data.sort((a,b)=> a.order_items_counter - b.order_items_counter);
          resolve(data);
        }
      })
    })
  }

  public updateOrderItem(orderItem):Promise<any>{
    const url = `${RootProvider.APIURL}${this.managerApiController}${this.managerUpdateOrderItemActionString}stuff_id=${orderItem.stylistId}&order_item_id=${orderItem.id}`;
    return new Promise((resolve)=>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      })
    })
  }

  public managerChangeOrderStatus(managerId,orderId,statusId):Promise<any>{
    const url = `${RootProvider.APIURL}${this.managerApiController}${this.managerChangeOrderStatusActionString}order_id=${orderId}&branch_manager_id=${managerId}&status_id=${statusId}`;
    return new Promise((resolve)=>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      })
    })
  }


  public async saveUser(user: User) {
    let data = await this.storage.set('toi-staff-user', user);
    this.event.publish('user-updated')
  }


  public async getUser(): Promise<any> {
    return new Promise((resolve)=>{
      this.storage.get('toi-staff-user').then((data : any) => {
        if(data != undefined){
          // let user = new User(data.type , data.Manager == undefined? data.stylist : data.Manager );
          resolve(data);
        }else{
          resolve(null);
        }
      
      });
    })



  }

  public async logout() {
    this.storage.remove('toi-staff-user');
  }

}

export class User {
  type : string ;
  public stylist : Stylist;
  public Manager : Manager;
  constructor(type : string , user : any){
    this.type = type;
    if(this.type == 'manager'){
      this.Manager = <Manager> user;
    }else{
      this.stylist = <Stylist> user;
    }
  }

  // public getUser(){
  //   if(this.type =='manager'){
  //     return this.Manager;
  //   }else{
  //     return this.stylist;
  //   }
  // }
  // public setUser(userData){
  //   if(this.type =='manager'){
  //     this.Manager = userData;
  //   }else{
  //     this.stylist = userData;
  //   }
  // }

}
export class Manager {
  id
  userName
  passWord
  vendorId
  branchId
  name
  phone
  deviceId
  constructor(id : string , userName : string , password  : string ,vendorId : string , branchId : string , name : string , phone :string , deviceId : string){
    this.id = id ;
    this.userName = userName ; 
    this.passWord = password ; 
    this.vendorId = vendorId;
    this.branchId = branchId;
    this.name = name;
    this.phone = phone;
    this.deviceId = deviceId;
  }
}
export class Stylist{
  id: string;
  name: string;
  gender: string;
  password: string;
  email: string;
  phone: string;
  image: string;
  serverImage: string;
  areaId: string;
  deviceId: string;
  userName: string;
  available: any;
  queue: any;
  constructor(id: string , name: string , password: string ,  gender: string, email: string, phone: string, area_id, deviceId: string, user_name: string, available, queue, serverImage){
    this.id = id;
    this.name = name;
    this.gender = gender
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.areaId = area_id;
    this.deviceId = deviceId;
    this.image = serverImage;
    this.userName = user_name;
    this.available = available;
    this.queue = queue;
  }
}


export class order {
  id: string;
  customerName: string;
  customerPhone: string;
  orderDate: Date;
  totalPrice: number;
  address: string;
  orderStatusId: string;
  areaId: string;
  userToken: string
  long: string;
  lat: string;
  user_id: number;
  orderStatus: string;
  customerImage: string;
  wallet: number;
  walletUsed:string;
  order_info : string;
  constructor(id: string,
    customerName: string,
    customerPhone: string,
    orderDate: string,
    totalPrice: number,
    address: string,
    areaId: string,
    order_states_id = "1",
    userToken,
    long,
    latt,
    user_id,
    customerImage,
    wallet,
    order_info,
    walletUsed
  ) {
    this.id = id;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.orderDate = new Date(orderDate);
    this.totalPrice = totalPrice;
    this.address = address;
    this.areaId = areaId;
    this.orderStatusId = order_states_id;
    this.userToken = userToken;
    this.lat = latt;
    this.long = long;
    this.user_id = user_id;
    this.customerImage = customerImage
    this.wallet = wallet;
    this.order_info = order_info
    this.walletUsed=walletUsed;
  }
}
export class orderItem {
  productName: string;
  cost: number;
  stylistName: string;
  isProduct: string;
  stylistPhone: string;
  stylistImg: string;
  stylistId: string;
  id:string;
  quant:any


  constructor(id,ProductName, cost, stylistName, is_product, stylistPhone, StylistImg,stuff_id , quant) {
    this.id = id;
    this.productName = ProductName;
    this.cost = cost;
    this.stylistName = stylistName == undefined ? "" : stylistName;
    this.isProduct = is_product;
    this.stylistImg = StylistImg == undefined ? "" : StylistImg;
    this.stylistPhone = stylistPhone == undefined ? "" : stylistPhone;
    this.stylistId = stuff_id == undefined ? "" : stuff_id;
    this.quant = quant
  }
}



export class ImageProcess {

  constructor() {

  }

  static getImagesUrl(images: Array<string>) {
    for (let i = 0; i < images.length; i++) {
      images[i] = this.getImageUrl(images[i]);
    }
    return images;
  }

  static getImageUrl(image: string) {
    let baseString = RootProvider.ImagesUrl;
    image = image.slice(1, image.length);
    return baseString + image;
  }
  static getUserImageUrl(image: string) {
    let baseString = RootProvider.UserImagesUrl;
    image = image.slice(1, image.length);
    return baseString + image;
  }
}


export class orderStatus {
  id: string;
  name: string;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}




