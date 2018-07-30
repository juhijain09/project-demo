import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { MySqlService, AssetService, PagerService} from '../../Services';
import { 
		mainUrl , zoneName, assetName, WorkerName, GetDeviceList  } from '../../constants';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import * as moment from 'moment'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';// to send data from UI

 
@Component({
  selector: 'location-change-info',
  templateUrl: './location-change-info.component.html',
  styleUrls: ['./location-change-info.component.css']
})
export class LocationChangeInfoComponent {
		public workerData$;
		public workerLocInfo;
    public Zone_A = zoneName;
    public Zone_W = zoneName;
    public workerName = WorkerName;
    public assetName = assetName;
    public allItems :any[];
    public pager:any = {};
    public pagedItems:any[]
    public dataInfo = 'WorkerInfo';
  constructor(
  				private mysqlService: MySqlService,
  				private assetService: AssetService,
          private pagerService: PagerService,
  				public store: Store<fromRoot.State>) { 	     
          this.addWorkerDataDB();        
			}

  public addWorkerDataDB(){
          // const apiUrl =  mainUrl + GetDeviceList;  
           // from the api
           // this.assetService.getAssetList(apiUrl)
          this.store.select(fromRoot.getWorkerInfo)
          .subscribe((data)=>{
            _.forEach(data, (item)=>{
              console.log('add worker', item);
              var payload = {
              worker_name: item.description,
              entry_time : moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              current_location : item.zoneName,
              alias: item.alias,
              skill: item.skill
            }; 
            // this.getAllworkerData();
              this.mysqlService.addWorkerlocation(payload)
              .subscribe(res =>{
                console.log('data from add location', res);
                if(res.success === 'true'){
                  this.getAllworkerData();
                }
              });
          });
       }); 
  }
   public addAssetDataDB(){
           // from the api
          // const apiUrl =  mainUrl + GetDeviceList; 
          //  this.assetService.getAssetList(apiUrl);
          this.store.select(fromRoot.getAssetInfo)
          .subscribe((data)=>{
            _.forEach(data, (item)=>{
              console.log('add asset', item);
              var payload = {
              asset_name: item.description,
              entry_time : moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              current_location : item.zoneName
            }; 
              this.mysqlService.addAssetlocation(payload)
              .subscribe(res =>{
                console.log('data from add asset', res);
                if(res.success === 'true'){
                  // this.getAllAssetData();
                }
              });
          });
       }); 
  }
	public getInfoByWorkername(username){
    this.dataInfo = 'WorkerInfo';
  		var payload = {
  			worker_name:username
  		}
				// get user by name
		this.mysqlService.trackByWorkername(payload)
		.subscribe(data =>{
			this.workerLocInfo = data;
      this.setPage(1);
		});		
  }
  	public getInfoByWorkerLocation(location){
      this.dataInfo = 'WorkerInfo';
  		console.log('location val', location);
  		var payload = {
  			current_location:location
  		}
				// get user by location
		 this.mysqlService.trackByWorkerlocation(payload)
		.subscribe(data =>{
		 this.workerLocInfo = data;
       this.setPage(1);
		});		
  }

  /// from sql query
  	public getAllworkerData(){
      this.dataInfo = 'WorkerInfo';
				 this.mysqlService.getAllWorkerLocation()
				.subscribe(data =>{
				 this.workerLocInfo = data;
  				_.forEach(this.workerLocInfo, item =>{
  				  item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
  			});  this.setPage(1);		
		});     
  }

// ASSET QUERIES
  public getInfoByAssetname(username){
    this.dataInfo = 'AssetInfo';
      var payload = {
        asset_name: username
      }
        // get user by name
    this.mysqlService.trackByAssetname(payload)
    .subscribe(data =>{
      this.workerLocInfo = data;
      this.setPage(1);
    });    
  }
    public getInfoByAssetLocation(location){
      this.dataInfo = 'AssetInfo';
      var payload = {
        current_location:location
      }
        // get user by location
     this.mysqlService.trackByAssetlocation(payload)
    .subscribe(data =>{
     this.workerLocInfo = data;
       this.setPage(1);
    });    
  }

  /// from sql query
    public getAllAssetData(){
         this.addAssetDataDB();
         this.dataInfo = 'AssetInfo';
         this.mysqlService.getAllAssetLocation()
        .subscribe(data =>{
         this.workerLocInfo = data;
          _.forEach(this.workerLocInfo, item =>{
            item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
        });  this.setPage(1);    
    });     
  }

      public setPage(page: number) {
        console.log('worker info', this.workerLocInfo);
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workerLocInfo.length, page);
 
        // get current page of items
        this.pagedItems = this.workerLocInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log('paged items', this.pagedItems);
    }
}

