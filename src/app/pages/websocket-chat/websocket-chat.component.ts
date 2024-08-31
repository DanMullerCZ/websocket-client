import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketMessage } from 'src/app/interfaces/WebsocketMessage';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-websocket-chat',
  templateUrl: './websocket-chat.component.html',
  styleUrls: ['./websocket-chat.component.css']
})
export class WebsocketChatComponent implements OnInit {

  constructor(
    protected wss: WebsocketService,
  ) {  }

  ngOnInit(): void {
    console.log('Chat init')
  }

  connectWS() {
    this.wss.connect();
  }

  sendMessage() {
    this.wss.sendMessage('PING')
  }

  disconnect() {
    this.wss.close();
  }

}
