import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../models';
import * as _ from 'lodash';
import * as fromRoot from '../../reducers';
import { ToggleChatWindowAction } from '../../action';
import { Store } from '@ngrx/store';

import { AssetService , MessageService, MySqlService} from '../../Services';
import { mainUrl,
        SendMessage,
        ReceiveMessage } from '../../constants';
import * as moment from 'moment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
   @Input() private SelectedWorker;
   public chat_records =[];
   public records;
   public workerChangeInfo$;
   public draftMessage:string;
   public rcvMsg;
   public sendMsg;
   public latestMsgSent;
   public latestTime;

   @ViewChild('scrollMe') private el: ElementRef;

  constructor( public store: Store<fromRoot.State>,
           private mysqlService: MySqlService,
           private messageService: MessageService){
  }
   ngOnInit() {
       this.ReceiveMessages();
       // this.readDatabase();
       this.mysqlService.getUsers()
      .map(res => res.json())
      .subscribe(records => this.records = records);
  
    }
    ngAfterViewChecked() {        
          this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight; 
    }
  
  public readDatabase(){
    var workerDataRcv = {
      sender:'admin',
      receiver: this.SelectedWorker
    }
    var UserdataReceived = this.mysqlService.findByUsername(workerDataRcv)
    .subscribe(res =>{
      this.rcvMsg = res;
    });

    var workerDataSent = {
      receiver:'admin',
      sender: this.SelectedWorker
    }
    var UserdataSent = this.mysqlService.findByUsername(workerDataSent)
    .subscribe(res =>{
      this.sendMsg = res;
      this.chat_records = this.rcvMsg.concat(res);
      this.chat_records =_.sortBy( this.chat_records, 'chat_date' );
      _.forEach(this.chat_records, item =>{
        item.chat_date = moment(item.chat_date).format("DD-MM-YYYY HH:mm:ss");
      });
    this.latestMsgSent = this.chat_records[this.chat_records.length-1];
    this.latestTime = moment(this.latestMsgSent.chat_date,'DD-MM-YYYY HH:mm:ss').unix()*1000 
    console.log('latest sent time', moment(this.latestMsgSent.chat_date,'DD-MM-YYYY HH:mm:ss').unix()*1000);
    });
  }

  public SendMessage(){
    const sender = 'user6';
    const sendto = 'user11';
    const _msgtxt = this.draftMessage;
    const apiUrl = SendMessage + 'sender=' + sender + '&sendto=' + sendto + '&msgtxt=' + _msgtxt ;
    this.messageService.SendMessage(apiUrl)
    .subscribe((data) =>{
      if(data){
          console.log('data');
      }
    });  
          const date = new Date();
          var data = {
          receiver: this.SelectedWorker,
          chat_date: moment(date).format("YYYY-MM-DD HH:mm:ss"), // to UTC?
          sender: 'admin',
          msg_txt: _msgtxt,
          msg_status: 'outgoing'
    }     
        console.log('payload', data);
        this.SaveMsgtoDB(data);
// IF MSG DELIVERED THEN SAVE TO TABLE with delivery status
  }
   public ReceiveMessages(){
     const apiUrl = ReceiveMessage + 'user11';// should be replaced by current worker
     this.messageService.ReceiveMessage(apiUrl)
     .subscribe(data =>{
       _.forEach(data.messages, (item) =>{
         if(item.sender === "user11" && item.rcpt === "user6"){
          var _date =  moment(item.msgtime).format("YYYY-MM-DD HH:mm:ss");
           // console.log('current in time', item.msgtime, _date);
          if(item.msgtime > this.latestTime ){
            var data = {
                receiver: 'admin',
                chat_date: _date,
                sender:  this.SelectedWorker,
                msg_txt: item.msgtxt,
                msg_status: 'incoming'
              }
           this.SaveMsgtoDB(data); 
           }
         }
       });  
     });
       this.readDatabase(); // check where to place
   }
      public SaveMsgtoDB(data){
      this.mysqlService.addUser(data)
      .subscribe(res => {
        if(res.success == "true") {
          this.records.unshift(data); //?
            this.draftMessage = '';
            this.readDatabase();
        }
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
