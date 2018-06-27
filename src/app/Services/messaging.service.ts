import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
	constructor( private http:Http ){

	}
    public setRequestObject(apiUrl) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
                          headers.append("Access-Control-Allow-Origin" , "*");
                          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
                          headers.append('Access-Control-Allow-Methods', 'POST');
      const options = new RequestOptions({ headers, withCredentials:true });
      let requestObj = this.http.get(apiUrl, options);
      return requestObj;
  }
  public SendMessage(apiUrl){
  	return this.setRequestObject(apiUrl)
  	.map((response) =>{
  		console.log('response from message', response);
  		return response.json();
  	})

  }

}