import {Component, OnInit, Input} from '@angular/core';
import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Message} from '../../../model/message';
import {MessageService} from '../../../services/message.service';
import {ActivatedRoute, Route} from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [UseridStorage, MessageService]
})
export class ChatComponent implements OnInit {
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  @Input() private sessionId;
  private stompClient;
  public username;
  public messages = [new Message('')];


  constructor(private userIdStorage: UseridStorage, private messageService: MessageService, private route: ActivatedRoute) {
    // this.sessionId = this.route.parent.snapshot.params['sessionId'];
    this.username = userIdStorage.getUsername();
  }

  ngOnInit() {

    this.messageService.getMessages(this.sessionId, this.userIdStorage.getUserId()).subscribe(data => {
        this.messages = data;
      },
      error => {
        console.error('Error loading messages!');
        console.log(error);
        alert('Error loading messages');
      },
      () => this.initializeWebSocketConnection(this.sessionId));
  }

  initializeWebSocketConnection(id: number) {
    console.log('completed + sessionId:' + this.sessionId);
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/chat/' + id, (message) => { // ipv 2 -> sessionId
        if (message.body) {
          $('.chat-body').append(
            '<div class=\'message\'>' +
            '<div class="header">' +
            '<strong class="primary-font">' + 'Nick' + '</strong>' +
            '</div>'
            +
            '<p>' +
            message.body
            +
            '</p>'
            +
            '</div>'
          );
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    const usernameMessage = this.userIdStorage.getUsername() + ': ' + message;
    const dbMessage = new Message(usernameMessage);
    this.messageService.sendMessage(dbMessage, this.sessionId, this.userIdStorage.getUserId()).subscribe(data => { // ipv 2 naar sessionId
        console.log('message successfully send to database');
      },
      error => {
        console.error('Error sending message!');
        console.log(error);
        alert('Error sending message');
      });
    this.stompClient.send('/app/send/message/' + this.sessionId, {}, usernameMessage); // ipv 2 -> sessionId
    $('#input').val('');
  }

}
