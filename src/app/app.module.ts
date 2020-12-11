import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { WebSocketConnectorComponent } from './web-socket-connector/web-socket-connector.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    WebSocketConnectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
