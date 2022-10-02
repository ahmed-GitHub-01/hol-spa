import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { messageChatNumber } from '../models/messageChatNumber';
import { messages } from '../models/messages';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageSignalrService {
  hubUrl = environment.hubUrl;
  baseUrl = environment.apiUrl;
  phone = 0;
  private hubConnection: HubConnection | undefined;
  public messageThreadSource = new BehaviorSubject<messages[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  public messageNumberThreadSource = new BehaviorSubject<messageChatNumber[]>([]);
  messageNumberThread$ = this.messageNumberThreadSource.asObservable();

  constructor(private auth: AuthService, private http: HttpClient, private toastr: ToastrService) { }

  createHubConnection(): any {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'whatsApp', {
        accessTokenFactory: () => localStorage.getItem('token')
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start()
      .catch(error => console.log(error));


    this.hubConnection.on('ReceiveMessageThread', message => {
      this.messageNumberThreadSource.next(message);
      this.messageNumberThread$.pipe(take(1)).subscribe((phoneChat) => {
        phoneChat.sort((a, b) => a.dateSent > b.dateSent ? -1 : 1);
        this.messageNumberThreadSource.next([...phoneChat]);
      });
    });


    this.hubConnection.on('NewMessage', (message: any) => {
      if (message.fromNumber === this.phone || message.toNumber === this.phone) {
        this.messageThread$.pipe(take(1)).subscribe((messagess): any => {
          this.messageThreadSource.next([...messagess, message]);
          if (message.readMessage === null) {
            this.http.get(`${this.baseUrl}Messages/UpdateUnread/${this.phone}`);
          }
        });
      } else {
        this.toastr.success(message.contentMessage, 'New message: ' + message.fromNumber);
      }
      this.messageNumberThread$.pipe(take(1)).subscribe((msg): any => {
        msg.forEach(element => {
          if (element.phoneNumber === message.fromNumber && message.readMessage === null) {
            element.counterNonRead = element.counterNonRead + 1;
          }
        });
        msg.sort((a, b) => a.dateSent > b.dateSent ? -1 : 1);
        this.messageNumberThreadSource.next([...msg]);
      });
    });


    this.hubConnection.on('NewMessageSend', (message: any) => {
      if (message.toNumber === this.phone) {
        this.messageThread$.pipe(take(1)).subscribe((messagess): any => {
          this.messageThreadSource.next([...messagess, message]);
        });
      }
    });

    this.hubConnection.on('NewPhoneMessage', (message: any) => {
      this.messageNumberThread$.pipe(take(1)).subscribe((messagess): any => {
        this.messageNumberThreadSource.next([message, ...messagess]);
      });
    });

    this.hubConnection.on('updateStatus', (stus: any) => {
      if (stus.toNumber === this.phone) {
        this.messageThread$.pipe(take(1)).subscribe((message) => {
          message.forEach(element => {
            if (element.messageID === stus.messageID) {
              element.status = stus.status;
            }
          });
          this.messageThreadSource.next([...message]);
        });
      }
    });
  }

  stopHubConnection(): any {
    if (this.hubConnection) {
      this.messageThreadSource.next([]);
      this.messageNumberThreadSource.next([]);
      this.hubConnection.stop();
    }
  }

  uploadImage(file: any): any {
    return this.http.post(`${this.baseUrl}Messages/add-photo`, file);
  }

  async sendMessages(content: string, toNumber: number, types: string, imagesUrl: string, publicId0: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      to: toNumber,
      type: types,
      imageUrl: imagesUrl,
      text: content,
      usercode: this.auth.decodedToken.unique_name[0],
      senderName: this.auth.decodedToken.unique_name[1],
      fromNumber: this.auth.decodedToken.unique_name[4],
      phone_id: this.auth.decodedToken.unique_name[6],
      token: this.auth.decodedToken.unique_name[5],
      publicId: publicId0
    });

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      header: 'Access-Control-Allow-Origin: *',
    };

    fetch('https://webhookhol.herokuapp.com/webhook/sendmessagetemp', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // return this.hubConnection?.invoke('SendMessage').catch(error => console.log(error));
    return 0;
  }

  getChatNumber(): any {
    return this.http.get(`${this.baseUrl}Messages/PhoneNumberToChat/${this.auth.decodedToken.unique_name[0]}`);
  }

  getMessageForConversion(phoneNumber): any {
    this.phone = phoneNumber;
    this.messageNumberThread$.pipe(take(1)).subscribe((messagess) => {
      messagess.forEach(messagee => {
        // tslint:disable-next-line:triple-equals
        if (messagee.phoneNumber === phoneNumber && messagee.userCode == this.auth.decodedToken.unique_name[0]) {
          messagee.counterNonRead = 0;
        }
      });
      this.messageNumberThreadSource.next([...messagess]);
      // console.log(messagess);
    });
    return this.http.get(`${this.baseUrl}Messages/MessagesForConversion/${this.auth.decodedToken.unique_name[0]}/${phoneNumber}`);
  }

  postToCloudinary(imgblob: any): any {
    const data = {
      blob: imgblob
    };
    return this.http.post(`${this.baseUrl}Messages/add-photo`, data);
  }
}
