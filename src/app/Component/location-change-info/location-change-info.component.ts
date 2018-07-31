import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { 
		mainUrl , zoneName, assetName, WorkerName, GetDeviceList  } from '../../constants';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import * as moment from 'moment'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';// to send data from UI
import { AssetService , MessageService, MySqlService} from '../../Services';
import { AssetEntryAction, WorkerEntryAction } from '../../action';

 
@Component({
  selector: 'location-change-info',
  templateUrl: './location-change-info.component.html',
  styleUrls: ['./location-change-info.component.css']
})
export class LocationChangeInfoComponent {
  public WorkerEntry = [];
  public AssetEntry = [];
  public countW = 0;
  public countA = 0;
  public dbLength;

          constructor(
          private mysqlService: MySqlService,
          private messageService: MessageService,
          private assetService: AssetService, 
          public store: Store<fromRoot.State>) { 

         this.mysqlService.getWorkerTablelength()
        .subscribe(res =>{
          this.dbLength = res;
          if(this.dbLength && this.dbLength[0].RowCnt > 1){
          _.forEach(WorkerName,(item)=>{
          this.getWorkerLast_entry(item);
        }); 
      } 
    });
         this.mysqlService.getAssetTablelength()
        .subscribe(res =>{
          this.dbLength = res;
          if(this.dbLength && this.dbLength[0].RowCnt > 1){
          _.forEach(assetName,(item)=>{
          this.getAssetLast_entry(item);
        }); 
      }
    });           
	}
      public getWorkerLast_entry(username){
       this.countW++;
      var payload = {
        worker_name:username
      }
    this.mysqlService.trackByWorkername(payload)
    .subscribe(data =>{
      if(data[0]){
        this.WorkerEntry[username] = 
        {
          location:data[0].current_location,
          exit_time: data[0].entry_time,
        };
      }
      if(this.countW === WorkerName.length){
        this.store.dispatch(new WorkerEntryAction(this.WorkerEntry));
      }
    });
  }
      public getAssetLast_entry(username){
      this.countA++;
      var payload = {
        asset_name:username
      }
    this.mysqlService.trackByAssetname(payload)
    .subscribe(data =>{
      if(data[0]){
        this.AssetEntry[username] = 
        {
          location:data[0].current_location,
          exit_time: data[0].entry_time
        };
        }
      if(this.countA === assetName.length){
         this.store.dispatch(new AssetEntryAction(this.AssetEntry));
      }
    });
  }
}


 
