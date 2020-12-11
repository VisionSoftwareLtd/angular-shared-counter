import { Injectable } from '@angular/core';
import { observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketCounterService {

  static PORT: string = '8080';

  subject = new Subject();
  webSocket: WebSocket;

  constructor() { }

  connect() {
    // this.webSocket = new WebSocket(`ws://localhost:${SocketCounterService.PORT}`);
    this.webSocket = new WebSocket(`ws://angular-shared-counter.herokuapp.com/:${SocketCounterService.PORT}`);
    var that = this;
    this.webSocket.onopen = function() {
      console.log('Connected');
      that.subject.next(`{ "status" : "Connected" }`);
    };
    this.webSocket.onmessage = function(event) {
      var data = JSON.parse(event.data);
      console.log("Message: " + JSON.stringify(data));
      that.subject.next(`{ "update" : ${JSON.stringify(data)} }`);
    }
    this.webSocket.onclose = function() {
      console.log('Connection closed');
      that.subject.next(`{ "status" : "Disconnected" }`);
    }
  }

  disconnect() {
    this.webSocket.close();
  }

  subscribe(subscribeFunction: any) : Subscription {
    return this.subject.subscribe(subscribeFunction);
  }
}
