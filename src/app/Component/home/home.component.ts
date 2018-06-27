import { Component, OnInit } from '@angular/core';
import { AssetService , MessageService} from '../../Services';
import { mainUrl,
 		 GetDeviceList,
 		 assetName,
 		 SendMessage } from '../../constants';
import { AssetDataParser } from '../../parser';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[ AssetService , MessageService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	public assetData;
	public zone =[];

  constructor(private assetService: AssetService,
  			  private messageService: MessageService) {
  	_.forEach(assetName , (loc)=>{
  		this.zone[loc] = '';
  	})}

	public ngOnInit(){
		const apiUrl =  mainUrl + GetDeviceList;
		this.assetService.getAssetList(apiUrl)
		.subscribe((data) => {
		 	this.assetData = AssetDataParser(data);
		 	_.forEach(this.assetData, (device)=>{
		 		 if(this.zone[device.description] !== device.zoneName){
		 		 	if(device.description === 'Wipro EBC 4'){
		 		 	console.log(' i am inside ebc4');
		 		 	const sender = 'user6';
		 		 	const sendto = 'user11';
		 		 	const msgtxt = 'Hey you have moved to ' + device.zoneName;
		 		 	const apiUrl = SendMessage + 'sender=' + sender + '&sendto=' + sendto + '&msgtxt=' + msgtxt ;
		 		 	this.messageService.SendMessage(apiUrl)
		 		 	.subscribe((data) =>{
		 		 	});
		 		 }
	 		 }
		 		 this.zone[device.description] = device.zoneName;
		 	})
		});  console.log('this zone', this.zone);
	}
}
