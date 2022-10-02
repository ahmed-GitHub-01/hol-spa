import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-services',
  templateUrl: './whatsapp-services.component.html',
  styleUrls: ['./whatsapp-services.component.scss']
})
export class WhatsappServicesComponent implements OnInit {
  conversation;
  constructor() { }



  onConversationSelected(conversation): any {
    this.conversation = conversation;
  }
  ngOnInit(): void {
  }

}
