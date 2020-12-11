import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketCounterService } from '../socket-counter.service';

@Component({
  selector: 'app-web-socket-connector',
  templateUrl: './web-socket-connector.component.html',
  styleUrls: ['./web-socket-connector.component.css']
})
export class WebSocketConnectorComponent implements OnInit {

  status: string;
  message: string;
  subscription: Subscription;

  constructor(private socketCounterService: SocketCounterService) { }

  ngOnInit(): void {
    this.status = "Disconnected";
  }

  onConnect(): void {
    var that = this;
    this.subscription = this.socketCounterService.subscribe((data => {
      var jsonData = JSON.parse(data);
      if (jsonData.status) {
        that.status = jsonData.status;
      }
    }));
    this.socketCounterService.connect();
  }

  onDisconnect(): void {
    this.socketCounterService.disconnect();
    setTimeout(() => {
      this.subscription.unsubscribe();
    }, 1000);
  }
}
