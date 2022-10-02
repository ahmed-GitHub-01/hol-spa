import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { messages } from 'src/app/models/messages';
import { MessageSignalrService } from 'src/app/signalrServices/message-signalr.service';
// import { value1Value2SerializationsInfo } from 'devexpress-reporting/scopes/reporting-chart-internal';

@Component({
  selector: 'app-whatsapp-sidbar',
  templateUrl: './whatsapp-sidbar.component.html',
  styleUrls: ['./whatsapp-sidbar.component.scss']
})
export class WhatsappSidbarComponent implements OnInit {

  constructor(public message: MessageSignalrService) { }
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  searchText: string;
  conversation: any = [];
  conversations: any = [];
  counter;

  getMessageForConversion(msg: any): any {
    this.message.getMessageForConversion(msg.phoneNumber).subscribe((messagee: messages[]) => {
      this.message.messageThreadSource.next(messagee);
      // console.log(messagee);
    });
  }

  get filteredConversations(): any {
    return this.conversations.filter((conversation) => {
      return (
        conversation.phoneNumber
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.lastMessage.toLowerCase().includes(this.searchText.toLowerCase())
        // conversation.messages.filter((message) => {
        //   message.body.toLowerCase().includes(this.searchText.toLowerCase());
        // })
      );
    });
  }

  ngOnInit(): void {
    // this.getMessageSender();
  }

}
