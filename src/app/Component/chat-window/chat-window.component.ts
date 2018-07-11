import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import * as _ from 'lodash';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
   // @Input('messages')
   private messages : Message[];
  constructor() { }

  ngOnInit() {
  }
  	public sendMessage(): void {
  		_.forEach((this.messages),message =>{
    	message.timestamp = new Date();
    	this.messages.push(message);	
    	message = new Message('', 'assets/images/mineWorkers.png');
  		})

  }
}
