import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import * as fromRoot from './reducers';
import { Store } from '@ngrx/store';

import { AssetService , MessageService, MySqlService} from './Services';
import { 
	    	mainUrl,
        SendMessage,
        ReceiveMessage,
        GetDeviceList } from './constants';
import {  WorkerInfoAction, AssetInfoAction } from './action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(	private router:Router,
  				private mysqlService: MySqlService,
  				private messageService: MessageService,
  				private assetService: AssetService, 
  				public store: Store<fromRoot.State>){

  	      const apiUrl =  mainUrl + GetDeviceList;
		      this.assetService.getAssetList(apiUrl)
		      .subscribe((data) => {
            console.log('data in app comp', data);
		      this.store.dispatch(new WorkerInfoAction(data.workerData));
          this.store.dispatch(new AssetInfoAction(data.assetData));
		});

  }
  public ngOnInit(){
  	this.router.navigate(['app-home']);
  }
}
