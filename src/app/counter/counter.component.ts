import { Component, OnInit } from '@angular/core';
import { HttpCounterService } from '../http-counter.service';
import { SocketCounterService } from '../socket-counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter: string = "Disconnected";

  constructor(private httpCounterService: HttpCounterService,
              private socketCounterService: SocketCounterService) { }

  ngOnInit(): void {
    var that = this;
    this.socketCounterService.subscribe((data => {
      var jsonData = JSON.parse(data);
      console.log(`CounterComponent received data ${data}`);
      if (jsonData.update) {
        that.counter = jsonData.update.counter;
      }
      if (jsonData.status && jsonData.status == "Disconnected") {
        that.counter = jsonData.status;
      }
    }));
  }

  onIncrement(): void {
    this.httpCounterService.increment().subscribe(unused => {console.log(unused)});
  }

  onDecrement(): void {
    this.httpCounterService.decrement().subscribe(unused => {console.log(unused)});
  }
}
