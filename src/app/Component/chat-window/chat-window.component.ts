import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import * as _ from 'lodash';
import * as fromRoot from '../../reducers';
import { ToggleChatWindowAction } from '../../action';
import { Store } from '@ngrx/store';

import { AssetService , MessageService, MySqlService} from '../../Services';
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

  constructor( public store: Store<fromRoot.State>,
               private mysqlService: MySqlService)
                {
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

  public readMessages(){
                    var Currentuserdata = this.mysqlService.findByUsername(this.workerData)
                .subscribe(res =>{
                  this.messages = res;
                  console.log('curr user data', res);
                })
  }
  ngOnInit() {
  }

  public SendMessage(){
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
          // this.records.unshift(data);
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
    // this.draftMessage = '';
    event.preventDefault();
  }

}
