import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {Message} from '../../../../model/message';
import {MessageService} from '../../../../services/message.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from 'angular2/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [UseridStorage, MessageService]
})
export class ChatComponent implements OnInit, OnDestroy {

  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  @Input() private sessionId;
  private stompClient;
  public username;
  public messages = [new Message('')];
  private error_message = '';

  constructor(private userIdStorage: UseridStorage,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.username = userIdStorage.getUsername();
  }

  ngOnInit() {

    this.messageService.getMessages(this.sessionId, this.userIdStorage.getUserId()).subscribe(data => {
        this.messages = data;
      },
      error => {
        console.error('Error loading messages!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen berichten', 'x', {duration: 2000});
      },
      () => this.initializeWebSocketConnection(this.sessionId));
  }

  initializeWebSocketConnection(id: number) {
    console.log('completed + sessionId:' + this.sessionId);
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/chat/' + id, (message) => {
        if (message.body) {
          $('.chat-body').append(
            '<div class=\'message\'>' +
            '<p>' +
            message.body
            +
            '</p>'
            +
            '</div>'
          );
        }
      });
    });
  }

  sendMessage(message) {
    const usernameMessage =  this.userIdStorage.getUsername() + ': ' + message;
    const dbMessage = new Message(usernameMessage);
    this.messageService.sendMessage(dbMessage, this.sessionId, this.userIdStorage.getUserId()).subscribe(data => {
        console.log('message successfully send to database');
      },
      error => {
        this.translate.get('package.component.error_message', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
      }, () => {
        let datePipe = new DatePipe();
        let date = datePipe.transform(new Date(), 'MM/dd/yyyy');
        this.stompClient.send('/app/send/message/' + this.sessionId, {}, date + " " + usernameMessage);
        $('#input').val('');
      });
  }

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

}
