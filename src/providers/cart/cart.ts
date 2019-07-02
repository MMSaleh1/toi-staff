import { Product } from './../items-api/items-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  cartItems : Array<CartItem>;
  cartQuant : number;
  totalPrice: number;
  private static instance: CartProvider = null;
  static isCreating: boolean = false;
  constructor() {
    if (!CartProvider.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {
      this.cartItems =new Array();
      this.cartQuant = 0;
      this.totalPrice = 0;
    }
  }
  static getInstance() {
    console.log('Database Provider');
    if (CartProvider.instance === null) {
      CartProvider.isCreating = true;
      CartProvider.instance = new CartProvider();
      CartProvider.isCreating = false;
    }
    return CartProvider.instance;
  }


  public getItems(){
    return this.cartItems;
  }
  public getQuant(){
    return this.cartQuant;
  }



  clear() {
    this.cartItems = new Array<CartItem>();
    this.cartQuant = 0;
  }

  public removeItem(index : any,isDelete:boolean=true){
    if(isDelete){
      if(this.cartItems.length==1){
        this.cartItems.pop();  
        this.cartQuant= 0;
        this.totalPrice=0;
      }else{
        let counter = index+1;
        for(let i = index ; i<this.cartItems.length-1;i++){
          this.cartItems[i]=this.cartItems[counter++];
          } 
        
          this.cartQuant= this.cartQuant - this.cartItems[index].quant;
          this.totalPrice = this.totalPrice - (this.cartItems[index].quant * this.cartItems[index].item.price);
          this.cartItems.pop(); 
        }
    }else{
      if(this.cartItems[index].quant!=1){
        this.cartItems[index].quant = this.cartItems[index].quant-1;
        this.cartQuant--;
        this.totalPrice = this.totalPrice - this.cartItems[index].item.price;
      }else{
        this.removeItem(index,true)
      }
    }
   

  }

  public addItem(product: Product){
    let flgFound = false;
    this.cartItems.forEach(specific_item => {
      console.log(specific_item);
      console.log(product);
      if (specific_item.item != undefined && specific_item.item.id == product.id) {
        flgFound = true;
        specific_item.quant = parseInt(specific_item.quant.toString()) + 1;
        
      }
      
    })
    
    if (!flgFound) {
      this.cartItems.push(new CartItem(product,1));
    }
    this.cartQuant++;
    this.totalPrice = this.totalPrice + product.price;
    
  }
 





}

export class  CartItem{
  item : Product
  quant : number;
  constructor(item : Product , quant : number = 1){
    this.item = item;
    this.quant = quant;
  }
}
