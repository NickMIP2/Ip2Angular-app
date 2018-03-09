import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Message} from '../../../model/message';
import {MessageService} from '../../../services/message.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [UseridStorage, MessageService]
})
export class ChatComponent implements OnInit {
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  private stompClient;
  public username;

  constructor(private userIdStorage: UseridStorage, private messageService: MessageService) {
    this.username = userIdStorage.getUsername();
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat/2', (message) => { // ipv 2 -> sessionId
        if (message.body) {
          $('.chat').append('<div class=\'message\'>' + message.body + '</div>');
          console.log(message.body);
        }
      });
    });
  }
  sendMessage(message){
    let usernameMessage = this.userIdStorage.getUsername() +': ' +  message ;
    let dbMessage = new Message(2, usernameMessage, new Date());
    this.messageService.sendMessage(dbMessage).subscribe(data => {
        console.log("message successfully send to database");
      },
      error => {
        console.error("Error sending message!");
        console.log(error);
        alert("Error sending message");
      });
    this.stompClient.send('/app/send/message/2' , {}, usernameMessage); // ipv 2 -> sessionId
    $('#input').val('');
  }

}
