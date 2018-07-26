import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2, Inject , OnChanges} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { AssetService , MessageService, MySqlService} from '../../Services';
import { mainUrl,
 		 GetDeviceList,
 		 assetName,
 		 WorkerName,
 		 SendMessage } from '../../constants';
import { AssetDataParser } from '../../parser';

import { ToggleChatWindowAction } from '../../action';
import { HostListener } from '@angular/core'

import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[ AssetService , MessageService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
	public assetData$;
	public zone =[];
	public context:CanvasRenderingContext2D;
	public image;
	public source;
	public canvas;
	public zone1;
	public zone2;
	public zone3;
	public canvas2;
	public isChatWindowVisible$;
	public records;
	public SelectedWorker;
	public buffer;
	@ViewChild("myCanvas") myCanvas;

  constructor(
	  private assetService: AssetService,
	  private messageService: MessageService,
	  private mysqlService: MySqlService,
	  private el: ElementRef, 
	  private renderer: Renderer2, 
	  @Inject(DOCUMENT) private document,
	  public store: Store<fromRoot.State>) {
		// why required?
		_.forEach(WorkerName , (loc)=>{
			this.zone[loc] = '';
	});
	  this.isChatWindowVisible$ = store.select(fromRoot.getChatWindowStatus);
	  this.isChatWindowVisible$
	  .subscribe((data) =>{
	  	console.log('data from chatwindow', data);
	  })


	  this.ReloadBrowser();
  	}
	@HostListener('window:resize', ['$event'])
    onResize(event){
    	this.ngAfterViewInit();
   }
  	public ngAfterViewInit() {
  	 	this.canvas = this.myCanvas.nativeElement;
  	 	this.context = this.canvas.getContext("2d");
		this.image = '../../../assets/image/flr_map.jpg';
		this.source = new Image(); 
		this.source.crossOrigin = 'Anonymous';
		this.source.onload = () => {
			this.canvas.height = window.innerHeight ;
			this.canvas.width = window.innerWidth;
			var image_start = (window.innerWidth)*0.15 // 15% margin
			this.context.drawImage(this.source, image_start, 0,window.innerWidth*0.85, window.innerHeight);
			this.image = this.canvas.toDataURL();  
		};
		this.source.src = this.image;
		// this.ReloadBrowser();
  	  }

	public ReloadBrowser(){
		const apiUrl =  mainUrl + GetDeviceList;
		// this.assetService.getAssetList(apiUrl)
		this.store.select(fromRoot.getWorkerInfo)
		.subscribe((data) => {
		 	console.log('data from home',data);
		 	_.forEach(data, (device)=>{
		 		 if(this.zone[device.description] !== device.zoneName){
		 		 	this.getLocationPoints(device);
		 		 	if(device.description === 'Wipro EBC 4'){
		 		 	const sender = 'user6';
		 		 	const sendto = 'user11';
		 		 	// mapping of receiver will be done based on worker.
		 		 	const msgtxt = 'Hey you have moved to ' + device.zoneName;
		 		 	const apiUrl = SendMessage + 'sender=' + sender + '&sendto=' + sendto + '&msgtxt=' + msgtxt ;
		 		 	this.messageService.SendMessage(apiUrl)
		 		 	.subscribe((data) =>{
		 		 	});
		 		 }
	 		 }
		 		 this.zone[device.description] = device.zoneName;
		 	})
		});
	}


	public getLocationPoints(worker){
		var max_width = this.canvas.width;
    	var max_height = this.canvas.height;
    	this.buffer = max_width*0.15;
 		if (worker.zoneName === "Zone-1") {
	    	const y_scale1 = (max_height *56)/100 ;
    		const x_scale1 = (max_width*23)/100 ;
	    	const pos_x1 = x_scale1/2  + this.buffer;
    		const pos_y1 = y_scale1/2;
 			const pos_x2 = x_scale1 *0.75 + this.buffer;
 			const pos_y2 = y_scale1 * 0.25;
 			const pos_x3 = x_scale1 *0.25 + this.buffer;
 			const pos_y3 = y_scale1 * 0.75;
 		if(worker.description === 'Wipro EBC 4'){
			const child1 = this.renderer.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"  id = "Wipro-EBC-4" ></i> <div style="color:purple font-size:10px"> '+worker.description+'<div>';
			this.renderer.appendChild(this.el.nativeElement, child1);
			this.el.nativeElement.querySelector('#Wipro-EBC-4').addEventListener('click',this.getChatwindow.bind(this));	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = this.renderer.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker" id = "Wipro-EBC-2" ></i><div style="color:purple font-size:10px"> '+worker.description+'<div> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
			this.el.nativeElement.querySelector('#Wipro-EBC-2').addEventListener('click',this.getChatwindow.bind(this));
 		} else{
			const child3 = this.renderer.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker" ></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}	
 		if (worker.zoneName === "Zone-2") {
    		const y_scale2 = (max_height *56)/100 ;
    		const xmin_scale2 = (max_width*27)/100 
    		const xmax_scale2 = (max_width*45)/100;
    		const x_scale2 = xmax_scale2 -xmin_scale2;
    		const pos_x1 = (xmin_scale2 +x_scale2 * 0.10 ) + this.buffer;
    		const pos_y1 = y_scale2 * 0.2;
 			const pos_x2 = (xmin_scale2 + x_scale2 *0.40) + this.buffer;
 			const pos_y2 = y_scale2 * 0.5;
 			const pos_x3 = xmin_scale2 + (xmax_scale2 -xmin_scale2) * 0.40  + this.buffer
 			const pos_y3 = y_scale2 * 0.1;

 		if(worker.description === 'Wipro EBC 4'){
			const child1 = this.renderer.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"  id = "Wipro-EBC-4" ></i> <div style="color:purple font-size:10px"> '+worker.description+'<div>';
			this.renderer.appendChild(this.el.nativeElement, child1);
			this.el.nativeElement.querySelector('#Wipro-EBC-4').addEventListener('click',this.getChatwindow.bind(this));	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = this.renderer.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker" id = "Wipro-EBC-2" ></i><div style="color:purple font-size:10px"> '+worker.description+'<div> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
			this.el.nativeElement.querySelector('#Wipro-EBC-2').addEventListener('click',this.getChatwindow.bind(this));
 		} else{
			const child3 = this.renderer.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker" ></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}
	 		if (worker.zoneName === "Zone-3") {
    		var x_scale3 = (max_width *29)/100 ;
    		var ymin_scale3 = (max_height*59)/100 
    		var ymax_scale3 = (max_height*80)/100;
    		const y_scale3 = ymax_scale3 -ymin_scale3;
    		const pos_y1 = ymin_scale3 +y_scale3 * 0.75;
    		const pos_x1 = x_scale3 * 0.25 + this.buffer;
 			const pos_y2 = ymin_scale3 + y_scale3 *0.25;
 			const pos_x2 = x_scale3 * 0.75 + this.buffer;
 			const pos_y3 = ymin_scale3 + (ymax_scale3 -ymin_scale3) * 0.75
 			const pos_x3 = x_scale3 * 0.1 +  this.buffer;

 		if(worker.description === 'Wipro EBC 4'){
			const child1 = this.renderer.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"  id = "Wipro-EBC-4" ></i> <div style="color:purple font-size:10px"> '+worker.description+'<div>';
			this.renderer.appendChild(this.el.nativeElement, child1);
			this.el.nativeElement.querySelector('#Wipro-EBC-4').addEventListener('click',this.getChatwindow.bind(this));	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = this.renderer.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker"  id = "Wipro-EBC-2" ></i><div style="color:purple font-size:10px"> '+worker.description+'<div> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
			this.el.nativeElement.querySelector('#Wipro-EBC-2').addEventListener('click',this.getChatwindow.bind(this));
 		} else{
			const child3 = this.renderer.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker"  ></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}
	 		if (worker.zoneName === "default_zone") {
    		const y_scale4 = (max_height *56)/100 ;
    		const xmin_scale4 = (max_width*55)/100 
    		const xmax_scale4 = (max_width*74)/100;
    		const x_scale4 = xmax_scale4 -xmin_scale4;
    		const pos_x1 = (xmin_scale4 +x_scale4 * 0.1) + this.buffer;
    		const pos_y1 = y_scale4 * 0.75;
 			const pos_x2 = (xmin_scale4 + x_scale4 *0.5 )+ this.buffer;
 			const pos_y2 = y_scale4 * 0.5;
 			const pos_x3 = xmin_scale4 + (xmax_scale4 -xmin_scale4) * 0.75;
 			const pos_y3 = y_scale4 * 0.25;

 		if(worker.description === 'Wipro EBC 4'){
 			const child1 = this.renderer.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker " id = "Wipro-EBC-4"</i><div style="color:purple font-size:10px"> '+worker.description+'<div>';
			this.renderer.appendChild(this.el.nativeElement, child1);
			this.el.nativeElement.querySelector('#Wipro-EBC-4').addEventListener('click',this.getChatwindow.bind(this));

 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = this.renderer.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker" id = "Wipro-EBC-2"></i><div style="color:purple font-size:10px"> '+worker.description+'<div> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
			this.el.nativeElement.querySelector('#Wipro-EBC-2').addEventListener('click',this.getChatwindow.bind(this));
 		} else{
			const child3 = this.renderer.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker" ></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}

	return;
	}
	public getLocationPoint(event){		
		console.log(event.offsetX,  event.offsetY , this.canvas.width, this.canvas.height);
	}
	public getChatwindow(e){
		this.store.dispatch(new ToggleChatWindowAction(true));
		this.SelectedWorker = e.toElement.id;
	}
	
}

	
