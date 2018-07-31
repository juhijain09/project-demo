import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { MySqlService, AssetService, PagerService} from '../../../Services';
import { 
		mainUrl , zoneName, WorkerName, GetDeviceList  } from '../../../constants';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import * as moment from 'moment'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';// to send data from UI


@Component({
  selector: 'track-workers',
  templateUrl: './track-workers.component.html',
  styleUrls: ['./track-workers.component.css']
})
export class TrackWorkersComponent {

	  public workerData$;
	  public workerLocInfo;
    public Zone_W = zoneName;
    public workerName = WorkerName;
    public allItems :any[];
    public pager:any = {};
    public pagedItems:any[];
    public dataInfo = 'WorkerInfo';
    public WorkerEntry;
    public dbLength;
  constructor(
  				private mysqlService: MySqlService,
  				private assetService: AssetService,
      		private pagerService: PagerService,
  				public store: Store<fromRoot.State>) {
            this.store.select(fromRoot.getWorkerEntry)
            .subscribe(data =>{
              this.WorkerEntry = data;
            });
         this.mysqlService.getWorkerTablelength()
        .subscribe(res =>{
          this.dbLength = res;
          if(this.dbLength[0].RowCnt === 0){
            this.store.select(fromRoot.getWorkerInfo)
          .subscribe((data)=>{
            _.forEach(data, (item)=>{
              var payload = {
              worker_name: item.description,
              entry_time : moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              current_location : item.zoneName,
              alias: item.alias,
              skill: item.skill,
              exit_time : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }; 
            this.addWorkerDataDB(payload)
            });
        });
      }
    });
          this.getWorkerDataDB();             
	}

  public getWorkerDataDB(){
          this.store.select(fromRoot.getWorkerInfo)
          .subscribe((data)=>{
            _.forEach(data, (item)=>{
              console.log('worker Entry', this.WorkerEntry, [item.description], item.zoneName);
              if((this.WorkerEntry[item.description]) && (item.zoneName != this.WorkerEntry[item.description].location)){
              var exit_time = this.WorkerEntry[item.description].exit_time;
              var payload = {
              worker_name: item.description,
              entry_time : moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              current_location : item.zoneName,
              alias: item.alias,
              skill: item.skill,
              exit_time : moment(exit_time).format("YYYY-MM-DD HH:mm:ss")
            }; 
            this.addWorkerDataDB(payload)
            }
          });
       }); 
        this.getAllworkerData();
  }
  public addWorkerDataDB(payload){
    console.log('inside service');
              this.mysqlService.addWorkerlocation(payload)
              .subscribe(res =>{
                console.log('data from add location', res);
                if(res.success === 'true'){
                  this.getAllworkerData();
                }
          });
  }
	public getInfoByWorkername(username){
  		var payload = {
  			worker_name:username
  		}
		this.mysqlService.trackByWorkername(payload)
		.subscribe(data =>{
			this.workerLocInfo = data;
      _.forEach(this.workerLocInfo, item =>{
            item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
        });  this.setPage(1);  
		});	
  }
  	public getInfoByWorkerLocation(location){
  		var payload = {
  			current_location:location
  		}
		 this.mysqlService.trackByWorkerlocation(payload)
		.subscribe(data =>{
		 this.workerLocInfo = data;
       _.forEach(this.workerLocInfo, item =>{
            item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
        });  this.setPage(1);  ;
		});		
  }

  /// from sql query
  	public getAllworkerData(){
				 this.mysqlService.getAllWorkerLocation()
				.subscribe(data =>{
				 this.workerLocInfo = data;
  				_.forEach(this.workerLocInfo, item =>{
  				  item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
  			});  this.setPage(1);		
		});     
  }

      public setPage(page: number) {
        this.pager = this.pagerService.getPager(this.workerLocInfo.length, page);
        this.pagedItems = this.workerLocInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


}
