import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebsocketChatComponent } from './pages/websocket-chat/websocket-chat.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    WebsocketChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', children: [
        { path: 'websocket-chat', component: WebsocketChatComponent }
      ] }
  ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
