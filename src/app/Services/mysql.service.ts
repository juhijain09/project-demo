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

	getAllWorkerLocation() {
		return this.http.get('http://localhost:3000/getAllWorkerlocation')
		.map(res =>res.json());
	}

	getAllAssetLocation() {
		return this.http.get('http://localhost:3000/getAllAssetlocation')
		.map(res =>res.json());
	}

	getWorkerMessage() {
		return this.http.get('http://localhost:3000/getWorkerMessage')
		.map(res =>res.json());
	}
	getChatBaseDBlength() {
		return this.http.get('http://localhost:3000/getChatBaseDBlength')
		.map(res =>res.json());
	}
	getWorkerTablelength() {
		return this.http.get('http://localhost:3000/getWorkerTablelength')
		.map(res =>res.json());
	}
	getAssetTablelength() {
		return this.http.get('http://localhost:3000/getAssetTablelength')
		.map(res =>res.json());
	}
	addWorkerMessage(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });
		console.log('add user payload', data);
		return this.http.post('http://localhost:3000/addWorkerMessage', JSON.stringify(data), options)
			.map(res => res.json());
	}
	findMessagebyName(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/findMessagebyName',JSON.stringify(data), options)
			.map(res => res.json());
	}
	trackByWorkername(data){
		console.log(' payload by name', data);
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/trackByWorkername',JSON.stringify(data), options)
			.map(res => res.json());
	}
	
	addWorkerlocation(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });
		return this.http.post('http://localhost:3000/addWorkerlocation', JSON.stringify(data), options)
			.map(res => res.json());
	}

	trackByWorkerlocation(data){
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/trackByWorkerlocation',JSON.stringify(data), options)
			.map(res => res.json());
	}
	trackByAssetname(data){
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/trackByAssetname',JSON.stringify(data), options)
			.map(res => res.json());
	}
	
	addAssetlocation(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });
		return this.http.post('http://localhost:3000/addAssetlocation', JSON.stringify(data), options)
			.map(res => res.json());
	}

	trackByAssetlocation(data){
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/trackByAssetlocation',JSON.stringify(data), options)
			.map(res => res.json());
	}
}