import { Component, OnDestroy, OnInit } from '@angular/core';
import { Signalrservice } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SignalRDemo';
  constructor(
  public signalrService:Signalrservice
  ){}


ngOnInit(): void {
  this.signalrService.startConnection();
  // setTimeout(()=>
  // {
  //   this.signalrService.askServerListener();
  //   this.signalrService.askServer();
  // }, 2000 );
}
ngOnDestroy() {
  this.signalrService.hubConnection.off("askServerResponse");
}
}
