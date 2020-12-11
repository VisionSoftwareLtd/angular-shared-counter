import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter: number;

  constructor() { }

  ngOnInit(): void {
    this.counter = 1;
  }

  onIncrement(): void {
    this.counter += 1;
  }

  onDecrement(): void {
    this.counter -= 1;
  }
}
