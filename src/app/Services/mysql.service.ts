import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MySqlService {

	constructor(private http: Http) {
		this.http = http;
	}

	getUsers() {
		return this.http.get('http://localhost:3000/');
	}

	addUser(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/adduser', JSON.stringify(data), options)
			.map(res => res.json());
	}
	findByUsername(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/findByUsername',JSON.stringify(data), options)
			.map(res => res.json());
	}

}