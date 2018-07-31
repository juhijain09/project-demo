import { Component } from '@angular/core';
import * as _ from 'lodash';

import { MySqlService, AssetService, PagerService} from '../../../Services';
import { 
		mainUrl , zoneName, assetName, WorkerName, GetDeviceList  } from '../../../constants';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import * as moment from 'moment'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';// to send data from UI
@Component({
  selector: 'track-assets',
  templateUrl: './track-assets.component.html',
  styleUrls: ['./track-assets.component.css']
})
export class TrackAssetsComponent  {


	public workerLocInfo;
    public Zone_A = zoneName;
    public Zone_W = zoneName;
    public workerName = WorkerName;
    public assetName = assetName;
    public allItems :any[];
    public pager:any = {};
    public pagedItems:any[]
    public AssetEntry;
    public dbLength;
  constructor(
  				private mysqlService: MySqlService,
  				private assetService: AssetService,
      		private pagerService: PagerService,
  				public store: Store<fromRoot.State>) {
            this.store.select(fromRoot.getAssetEntry)
            .subscribe(data =>{
              this.AssetEntry = data;
            });
         this.mysqlService.getAssetTablelength()
        .subscribe(res =>{
          this.dbLength = res;
          if(this.dbLength[0].RowCnt === 0){
            this.store.select(fromRoot.getAssetInfo)
          .subscribe((data)=>{
            _.forEach(data, (item)=>{
              var payload = {
              asset_name: item.description,
              entry_time : moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              current_location : item.zoneName,
              exit_time :  moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }; 
              this.mysqlService.addAssetlocation(payload)
              .subscribe(res =>{
                console.log('data from add asset', res);
                if(res.success === 'true'){
                  this.getAllAssetData();
                }
              });
            });
        });
      }
    });
        this.addAssetDataDB(); 	             
		}
   public addAssetDataDB(){
     console.log('asset Entry', this.AssetEntry);
          this.store.select(fromRoot.getAssetInfo)
          .subscribe((data)=>{
            _.forEach(data, (item)=>{
              if((this.AssetEntry[item.description]) && (item.zoneName != this.AssetEntry[item.description].location)){
              var exit_time = this.AssetEntry[item.description].exit_time;
              var payload = {
              asset_name: item.description,
              entry_time : moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              current_location : item.zoneName,
              exit_time : moment(exit_time).format("YYYY-MM-DD HH:mm:ss")
            }; 
              this.mysqlService.addAssetlocation(payload)
              .subscribe(res =>{
                console.log('data from add asset', res);
                if(res.success === 'true'){
                  this.getAllAssetData();
                }
              });
            }
          });
       }); 
      this.getAllAssetData();
  }

// ASSET QUERIES
  public getInfoByAssetname(username){
      var payload = {
        asset_name: username
      }
        // get user by name
    this.mysqlService.trackByAssetname(payload)
    .subscribe(data =>{
      this.workerLocInfo = data;
      _.forEach(this.workerLocInfo, item =>{
            item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
        });  this.setPage(1);  
    });    
  }
    public getInfoByAssetLocation(location){
      var payload = {
        current_location:location
      }
        // get user by location
     this.mysqlService.trackByAssetlocation(payload)
    .subscribe(data =>{
     this.workerLocInfo = data;
       _.forEach(this.workerLocInfo, item =>{
            item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
        });  this.setPage(1);  
    });    
  }

  /// from sql query
    public getAllAssetData(){
         this.mysqlService.getAllAssetLocation()
        .subscribe(data =>{
         this.workerLocInfo = data;
          _.forEach(this.workerLocInfo, item =>{
            item.entry_time = moment(item.entry_time).format("DD-MM-YYYY HH:mm:ss");
        });  this.setPage(1);    
    });     
  }

      public setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workerLocInfo.length, page);
 
        // get current page of items
        this.pagedItems = this.workerLocInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
