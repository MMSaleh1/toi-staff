import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RootProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RootProvider {
  
  public static APIURL4 = "http://edge2018-001-site12.gtempurl.com/api/";
  public static ImagesUrl = "http://198.38.94.254/dashboard-toi/";
  public static UserImagesUrl = "http://198.38.94.254/api-toi/";
  // public static APIURL = "http://toitogo.com/api-toi/api/";
  // public static APIURL = "http://toitogo.com/api-toi/api/";  //live
   public static APIURL = "http://edge2018-001-site15.gtempurl.com/api/"  //testing
  constructor(public http: HttpClient) {
    console.log('Hello RootProvider Provider');
  }

}
