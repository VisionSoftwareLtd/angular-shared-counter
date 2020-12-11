import { Component, OnInit } from '@angular/core';
import { HttpCounterService } from '../http-counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter: number;

  constructor(private httpCounterService : HttpCounterService) { }

  ngOnInit(): void {
    this.httpCounterService.getCounter()
      .subscribe((value) => {
        this.counter = value;
      });
  }

  onIncrement(): void {
    this.httpCounterService.increment()
      .subscribe((value) => {
        this.counter = value;
      });
  }

  onDecrement(): void {
    this.httpCounterService.decrement()
      .subscribe((value) => {
        this.counter = value;
      });
  }
}
