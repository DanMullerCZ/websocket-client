import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebsocketMessage } from 'src/app/interfaces/WebsocketMessage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private subject$: Subject<MessageEvent | WebsocketMessage> | undefined;
  public messages: {
    timestamp: string,
    msg: string,
  }[] = [];

  public readyState;

  private heartbeatInterval: NodeJS.Timeout | undefined;
  private PING_INTERVAL = 5 * 60 * 1000;

  constructor() {
    this.connect();
    this.readyState = 0;

    setInterval(() => {
      this.readyState = this.socket ? this.socket.readyState : 0
    })
  }

  // Connect to WebSocket server
  public connect(inputUrl?: string): Subject<MessageEvent | WebsocketMessage> {
    if (!this.subject$) {
      const url = inputUrl ?? environment.websocketUrl;
      this.subject$ = this.create(url);
      console.log("Successfully connected: " + url);
    }

    this.subject$.subscribe({
      next: (msgFromServer: MessageEvent | WebsocketMessage) => {
        this.messages.push({
          timestamp: (new Date()).toUTCString(),
          msg: (msgFromServer as MessageEvent).data
        });
        console.log("Message from server:", msgFromServer);
      },
      error: (error: Event) => {
        console.error(error)
      },
      complete: () => {
        // when this happens, server is down
        console.warn('WebSocket connection closed')
      }
    });

    this.startHeartbeat(); // Start heartbeat mechanism

    return this.subject$;
  }

  // Create a new WebSocket connection
  private create(url: string): Subject<MessageEvent | WebsocketMessage> {
    this.socket = new WebSocket(url);

    const observable = new Observable((observer: any) => {
      this.socket.onmessage = (event: MessageEvent) => {
        observer.next(event);
      };
      this.socket.onerror = observer.error.bind(observer);
      this.socket.onclose = () => {
        this.clearHeartbeat();
        observer.complete();
      };
      return () => {
        this.socket.close();
      };
    });

    const observer = {
      next: (data: any) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(data);
        }
      }
    };

    return Subject.create(observer, observable);
  }

  // Send a pong message
  public sendMessage(msg: WebsocketMessage) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.messages.push({
        timestamp: (new Date()).toUTCString(),
        msg: msg,
      });
      this.socket.send(msg);
    }
  }

  private startHeartbeat() {
    console.log('sending mes')
    this.sendMessage('PING');
    this.heartbeatInterval = setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.sendMessage('PING');
      }
    }, this.PING_INTERVAL);
  }

  private clearHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }

  public close() {
    if (this.socket) {
      this.clearHeartbeat();
      this.subject$ = undefined;
      this.socket.close();
    }
  }
}
