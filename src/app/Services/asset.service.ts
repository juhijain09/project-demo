import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AssetDataParser } from '../parser';


import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import {  WorkerInfoAction } from '../action';

@Injectable()
export class AssetService {

  constructor(
    private http: Http,
    public store: Store<fromRoot.State> ) {  }

    public setRequestObject(apiUrl) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
                          //headers.append("Access-Control-Allow-Origin" , "*");
                          headers.append('APIKey', '16d49c9b-de55-4492-99d4-68b7ef1edc83');
                         // headers.append('Access-Control-Allow-Methods', 'GET');
      const options = new RequestOptions({headers});
      let requestObj = this.http.get(apiUrl, options);
      return requestObj;
  }
    public getAssetList(apiUrl){
      return this.setRequestObject(apiUrl)
      // .repeatWhen(() => Observable.interval(2000))
      .map((response)=>{
        console.log('I am here', response.json());
        var assetData = AssetDataParser(response.json());
        return assetData;
      })
    }
}
//, withCredentials:true