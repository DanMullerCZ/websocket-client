import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from './services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-websocket-client';
  protected isAtHome = true;

  constructor(
    private router: Router,
    private wsService: WebsocketService,
  ) {  }

  moveToChat() {
    console.log('Moving to ws chat')
    this.isAtHome = false;
    this.router.navigateByUrl("/websocket-chat")
  }
}
