import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {UseridStorage} from '../../../sessionStorage/userid-storage';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [UseridStorage]
})
export class ChatComponent implements OnInit {
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  private stompClient;
  public username;

  constructor(private userIdStorage: UseridStorage) {
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
      console.log('hier');
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('.chat').append('<div class=\'message\'>' + message.body + '</div>');
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    let usernameMessage = this.userIdStorage.getUsername() +': ' +  message ;
    this.stompClient.send('/app/send/message/1' , {}, usernameMessage);
    $('#input').val('');
  }

}
