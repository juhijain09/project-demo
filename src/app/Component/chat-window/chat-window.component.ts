import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../models';
import * as _ from 'lodash';
import * as fromRoot from '../../reducers';
import { ToggleChatWindowAction } from '../../action';
import { Store } from '@ngrx/store';

import { AssetService , MessageService, MySqlService} from '../../Services';
import { mainUrl,
        SendMessage } from '../../constants';
import * as moment from 'moment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
   // @Input('messages')
   private messages : Message[];
   public records;
   public workerChangeInfo$;
   public workerData;
   public currentWorker;
   public draftMessage:string;
   @ViewChild('scrollMe') private el: ElementRef;

  constructor( public store: Store<fromRoot.State>,
           private mysqlService: MySqlService,
           private messageService: MessageService){
          this.workerChangeInfo$ = store.select(fromRoot.getWorkerChangeInfo);
          this.workerChangeInfo$.subscribe((data)=>{
          this.workerData = data;
          console.log('this worker data', this.workerData);
          if(this.workerData && this.workerData.isTrusted) // change the condition
          {
            this.workerData.username = this.workerData.toElement.id;
            this.currentWorker = this.workerData.toElement.id;
          }
        });
        this.readMessages();
  }

    ngOnInit() {
       this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
       this.mysqlService.getUsers()
      .map(res => res.json())
        .subscribe(records => this.records = records);
  
    }
    ngAfterViewChecked() {        
          this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight; 
    }
  
  public readMessages(){
    var Currentuserdata = this.mysqlService.findByUsername(this.workerData)
    .subscribe(res =>{
    this.messages = res;
    console.log('curr user data', res);
    })
  }

  public SendMessage(){

    const sender = 'user6';
    const sendto = 'user11';
    const msgtxt = this.draftMessage;
    const apiUrl = SendMessage + 'sender=' + sender + '&sendto=' + sendto + '&msgtxt=' + msgtxt ;
    this.messageService.SendMessage(apiUrl)
    .subscribe((data) =>{
      console.log('data');
      });
// IF MSG DELIVERED THEN SAVE TO TABLE
    const date = new Date();
    var data = {
          username: this.currentWorker,
          chat_date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
          sender:'admin',
          rx_chat: this.draftMessage,
          tx_chat: 'NA'
    }

    console.log('payload', data);
     var result = this.mysqlService.addUser(data)
      .subscribe(res => {
        if(res.success == "true") {
          this.records.unshift(data);
            this.draftMessage = '';
            this.readMessages();
        }
        console.log(res);
      });
  }
    public CloseChatWindow(){
        this.store.dispatch( new ToggleChatWindowAction(false));
    }
     public onEnter(event: any): void {
      this.SendMessage();
      event.preventDefault();
    }

}
