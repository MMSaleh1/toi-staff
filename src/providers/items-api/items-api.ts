import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';
/*
  Generated class for the ItemsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsApiProvider extends RootProvider {

  private productApiController: string = "products/";
  private productsActionString: string = "get_all_product?";

  private categoriesApiController: string = "category/";
  private categoriesActionString: string = "get_all_services?";

  private subCategoriesApiController: string = "sub_category/"
  private subCategoriesActionString: string = "get_sub_category?"

  private vendorsApiController: string = "vendor/";
  private vendorActionString: string = "get_all_vendors?";


  constructor(public http: HttpClient,public storage: Storage) {
    super(http);
  }

  public async getCategories():Promise<any>{
    let categoies=  new Array<Category>();
    let tempcates = await this.storage.get('cates');
    categoies = tempcates == undefined ?  await this.getCategoriesNop() : tempcates;
    return new Promise((resolve)=>{
      resolve(categoies);
    })
    
  }

  private async ApiCall(url:string) : Promise<any>{
    console.log(url);
  return new Promise((resolve) => {
    this.http.get(url).subscribe((data: any) => {
      if (data == null || data.length == 0 ) {
        resolve([])
      }else{
        resolve(data);
      }
    });
  });
  }
  private async categoryTreeBuild(data:any){
    let items = <Array<Product>> await this.getItemsNop();
    let catArray = new Array<Category>();
    let subcat = new Array<Category>();
    for (let i = 0; i < data.length; i++) {
      let images = new Array();
      images.push(data[i].service_img)
      if(data[i].parent_service_id == 0 || data[i].parent_service_id == data[i].id ){
      
        catArray.push(new Category(data[i].service_name, data[i].id,new Array(),images,data[i].parent_service_id,data[i].deleted,false,data[i].available));
      }else{
        subcat.push(new Category(data[i].service_name, data[i].id,new Array(),images,data[i].parent_service_id,data[i].deleted,false,data[i].available));
      }
    }
    console.log(subcat);
    console.log(items);
    for(let i =0;i<subcat.length;i++){
      for(let j =0 ; j<items.length;j++){
        if(subcat[i].id == items[j].product_subcat){
          subcat[i].children.push(items[j]);
        }
      }
    }

    for(let i =  0 ; i < catArray.length;i++){
      for(let j = 0 ; j < subcat.length;j++){
        if(subcat[j].parent == catArray[i].id){
          catArray[i].children.push(subcat[j])
         
        }
      }
      catArray[i].hasSubCates = catArray[i].children.length > 0 ? true : false;
    }
   
   // this.storage.set('cates',catArray);
    return catArray;
  }

  public async getCategoriesNop(){
      let temp = `${RootProvider.APIURL}${this.categoriesApiController}${this.categoriesActionString}`;
      console.log(temp);
      let data = await this.ApiCall(temp);
      return this.categoryTreeBuild(data);
  }

  private async getItemsNop(): Promise<any> {
    let temp = `${RootProvider.APIURL}${this.productApiController}${this.productsActionString}`;
    let data = await this.ApiCall(temp);
    console.log(data);
    return new Promise((resolve) => {
        if (data == undefined || data.length == 0) {
          resolve([]);
        }
        else {
          console.log("107")
          let items: Product[] = new Array();
          for (let i = 0; i < data.length; i++) {
            // if(data[i].available == "1"){
              let images = new Array<string>();
              images.push(data[i].img1);
              images.push(data[i].img2);
              images.push(data[i].img3);
              items.push(new Product(data[i].product_name
                , data[i].id
                , data[i].category_id
                , data[i].cost
                , data[i].description
                , data[i].avaliable
                ,images
              ))
            }
          // }
          console.log(items);
          resolve(items);
        }
      })
  }



}




export class Category {




  parentShow?: boolean = false;
  images: String[];
  open: boolean;

  //////////////////////////////////////////
  id: string;
  name: string;
  parent?: string;
  children?: any[];
  hasSubCates: boolean;
  deleted: boolean;
  available: boolean
  constructor(name: string = "", id: string = "", children: any, NewsCategoryImages: string[], Parent: string = "", deleted: boolean, hasSubCate: boolean = false , available : string) {
    this.name = name;
    this.id = id;
    this.images = ImageProcess.getImagesUrl(NewsCategoryImages);
    this.parentShow = false;
    this.parent = Parent;
    this.open = false;
    this.deleted = deleted;
    this.children = children ? children : new Array();
    this.hasSubCates = hasSubCate;
    this.available = available == '1' ? true :false;
  }



}
export class Product {

  




  
  id: string; //
  name: string; //
  product_subcat ? : string;//
  description? : string;//
  images : Array<string>;
  available:boolean;
  price : number;
   constructor(product_name
    , id
    , category_id
    , cost
    , description
    , avaliable
    , images
  ) { 
    this.id = id; 
    this.name = product_name;
    this.description = description; 
    this.images =ImageProcess.getImagesUrl(images);
    this.product_subcat = category_id;
    this.available= avaliable;
    this.price = cost;



  }
}


export class Specs{
  weight: number;
  length: number;
  height: number;
  width: number;
  additionalSpecs: Array<specialSpecs>;
  constructor(weight:number,length:number,height:number,width:number,additonalSpecs:Array<specialSpecs>=new Array()){
    this.weight=weight;
    this.length=length;
    this.height=height;
    this.width=width;
    this.additionalSpecs=new Array();
    this.additionalSpecs=additonalSpecs;
  }
  
}

export class specialSpecs{
  name:string;
  val:any;
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

export class review{
  writerName:string;
  reviewTitle: string;
  reviewBody:string;
  creationDate:Date;
  constructor(wName:string,rTitle:string,rBody:string,date:Date){
    this.writerName = wName;
    this.reviewTitle = rTitle;
    this.reviewBody = rBody;
    this.creationDate = date;
  }

}