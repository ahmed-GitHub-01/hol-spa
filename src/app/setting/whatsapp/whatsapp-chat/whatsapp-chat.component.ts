import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MessageSignalrService } from 'src/app/signalrServices/message-signalr.service';
import { faFilePdf, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-whatsapp-chat',
  templateUrl: './whatsapp-chat.component.html',
  styleUrls: ['./whatsapp-chat.component.scss']
})
export class WhatsappChatComponent implements OnInit {
  @Input() conversation;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @ViewChild('imgRenderer') imgRenderer: ElementRef;
  emojiPickerVisible: any;
  faCoffee = faFilePdf;
  faPaperPlan = faPaperPlane;
  messages = '';
  phoneNumber: number;
  imageFile: any;
  imageblob: string;
  modalRef: BsModalRef;

  constructor(
    public message: MessageSignalrService,
    private modalSer: BsModalService) { }

  ngOnInit(): void {
    // console.log(this.conversation);
  }

  submitMessage(event): any {
    const value: any = event.target.value.trim();
    this.messages = '';
    if (value.length < 1) { return false; }
    this.conversation.lastMessage = value;
    // this.conversation.messages.unshift({
    //   id: 1,
    //   body: value,
    //   time: '10:21',
    //   me: true,
    // });
    this.message.sendMessages(value, this.conversation.phoneNumber, 'text', '', '');
  }


  submitMessage2(value0: any): any {
    const value: any = value0.trim();
    this.messages = '';
    if (value.length < 1) { return false; }
    this.conversation.lastMessage = value;
    this.message.sendMessages(value, this.conversation.phoneNumber, 'text', '', '');
  }


  submitMessageImage(txt): any {
    const value: any = txt.trim();
    this.messages = '';
    // if (value.length < 1) {
    //   this.toastr.error('The text must be entered before sending the image!');
    //   return false;
    // }
    // this.conversation.lastMessage = value;
    this.message.postToCloudinary(this.imageblob).subscribe((res: any) => {
      this.message.sendMessages(value, this.conversation.phoneNumber, 'image', res.url, res.publicId);
    });
  }


  hashingFile(file: any, fileName: string): any {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'pdf/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('visibility', 'hidden');
    link.download = fileName + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getPasteValue(event: any, template: TemplateRef<any>): any {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    if (blob !== null) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        this.imageblob = evt.target.result;
        this.modalRef = this.modalSer.show(template, Object.assign({},
          { class: 'modal-dialog modal-lg modal-dialog-centered' }));
      };
      reader.readAsDataURL(blob);

    }
  }

  emojiClicked(event): any {
    // this.message += event.emoji.native;
  }
}
