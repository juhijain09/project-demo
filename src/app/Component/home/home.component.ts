import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { AssetService , MessageService} from '../../Services';
import { mainUrl,
 		 GetDeviceList,
 		 assetName,
 		 SendMessage } from '../../constants';
import { AssetDataParser } from '../../parser';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[ AssetService , MessageService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
	public assetData;
	public zone =[];
	public context:CanvasRenderingContext2D;
	public image;
	public source;
	public canvas;
	public zone1;
	public zone2;
	public zone3;
	public canvas2;
	@ViewChild("myCanvas") myCanvas;
	@ViewChild("myzone1") myzone1;

  constructor(private assetService: AssetService,
  			  private messageService: MessageService,
  			  private el: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) {

  			_.forEach(assetName , (loc)=>{
  				this.zone[loc] = '';
  			});
  	}
  	 public ngAfterViewInit() {
  	 	this.canvas = this.myCanvas.nativeElement;
  	 	this.context = this.canvas.getContext("2d");
  	 		this.image = '../../../assets/image/flr_map.jpg';
  	 		this.source = new Image(); 
    		this.source.crossOrigin = 'Anonymous';
    		this.source.onload = () => {
    		this.canvas.height = this.source.height;
    		this.canvas.width = this.source.width;
    		this.context.drawImage(this.source, 0, 0);
		    this.image = this.canvas.toDataURL();  
		    		};
    		this.source.src = this.image;

  	  }
	public ngOnInit(){
		const apiUrl =  mainUrl + GetDeviceList;
		this.assetService.getAssetList(apiUrl)
		.subscribe((data) => {

			console.log('data',data);
		 	this.assetData = AssetDataParser(data);
		 	_.forEach(this.assetData, (device)=>{
		 		 if(this.zone[device.description] !== device.zoneName){
		 		 	this.getLocationPoints(device);
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
		});  
		
	}
	public getLocationPoints(worker){
		var max_width = this.canvas.width;
    	var max_height = this.canvas.height;

 		if (worker.zoneName === "Zone-left") {
	    	const y_scale1 = (max_height *56)/100 ;
    		const x_scale1 = (max_width*23)/100 ;
	    	const pos_x1 = x_scale1/2;
    		const pos_y1 = y_scale1/2;
 			const pos_x2 = x_scale1 *0.75;
 			const pos_y2 = y_scale1 * 0.25;
 			const pos_x3 = x_scale1 *0.25;
 			const pos_y3 = y_scale1 * 0.75;
 		if(worker.description === 'Wipro EBC 4'){
			const child1 = document.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child1);	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = document.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
 		} else{
			const child3 = document.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}	
 		if (worker.zoneName === "Zone-right") {
    		const y_scale2 = (max_height *56)/100 ;
    		const xmin_scale2 = (max_width*27)/100 
    		const xmax_scale2 = (max_width*45)/100;
    		const x_scale2 = xmax_scale2 -xmin_scale2;
    		const pos_x1 = xmin_scale2 +x_scale2 * 0.25;
    		const pos_y1 = y_scale2 * 0.2;
 			const pos_x2 = xmin_scale2 + x_scale2 *0.75;
 			const pos_y2 = y_scale2 * 0.5;
 			const pos_x3 = xmin_scale2 + (xmax_scale2 -xmin_scale2) * 0.75
 			const pos_y3 = y_scale2 * 0.1;

 		if(worker.description === 'Wipro EBC 4'){
			const child1 = document.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child1);	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = document.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
 		} else{
			const child3 = document.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}
	 		if (worker.zoneName === "zone-1") {
    		var x_scale3 = (max_width *29)/100 ;
    		var ymin_scale3 = (max_height*59)/100 
    		var ymax_scale3 = (max_height*80)/100;
    		const y_scale3 = ymax_scale3 -ymin_scale3;
    		const pos_y1 = ymin_scale3 +y_scale3 * 0.75;
    		const pos_x1 = x_scale3 * 0.25;
 			const pos_y2 = ymin_scale3 + y_scale3 *0.25;
 			const pos_x2 = x_scale3 * 0.75;
 			const pos_y3 = ymin_scale3 + (ymax_scale3 -ymin_scale3) * 0.75
 			const pos_x3 = x_scale3 * 0.1;

 		if(worker.description === 'Wipro EBC 4'){
			const child1 = document.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child1);	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = document.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
 		} else{
			const child3 = document.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}
	 		if (worker.zoneName === "default_zone") {
    		const y_scale4 = (max_height *56)/100 ;
    		const xmin_scale4 = (max_width*55)/100 
    		const xmax_scale4 = (max_width*74)/100;
    		const x_scale4 = xmax_scale4 -xmin_scale4;
    		const pos_x1 = xmin_scale4 +x_scale4 * 0.1;
    		const pos_y1 = y_scale4 * 0.75;
 			const pos_x2 = xmin_scale4 + x_scale4 *0.5;
 			const pos_y2 = y_scale4 * 0.5;
 			const pos_x3 = xmin_scale4 + (xmax_scale4 -xmin_scale4) * 0.75;
 			const pos_y3 = y_scale4 * 0.25;

 		if(worker.description === 'Wipro EBC 4'){
			const child1 = document.createElement('div');
			child1.innerHTML ='<div style="position:absolute;  left:'+pos_x1+'px; top:'+pos_y1+'px;"><i class="flaticon-worker"></i>';
			this.renderer.appendChild(this.el.nativeElement, child1);	
 		} else if(worker.description === 'Wipro EBC-2'){
			const child2 = document.createElement('div');
			child2.innerHTML ='<div style="position:absolute;  left:'+pos_x2+'px; top:'+pos_y2+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child2);
 		} else{
			const child3 = document.createElement('div');
			child3.innerHTML ='<div style="position:absolute;  left:'+pos_x3+'px; top:'+pos_y3+'px;"><i class="flaticon-worker"></i> ';
			this.renderer.appendChild(this.el.nativeElement, child3);
 		}
	}

	return;
	}
	public getLocationPoint(event){
		console.log(event.offsetX,  event.offsetY , this.canvas.width, this.canvas.height);
	}
}
