
import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr"
import { ToastrService } from "ngx-toastr";



@Injectable({ providedIn: 'root'})
export class Signalrservice{
  constructor(
    public toastr: ToastrService,
  ){}
  hubConnection:signalR.HubConnection;
  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/toastr', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('Hub Connection Started!');
      this.askServerListener();
      this.askServer();

    })
    .catch(err => console.log('Error while starting connection: ' + err))
}
async  askServer() {
  console.log('ask Server Started!');
  await this.hubConnection.invoke("askServer", "hi")
  .then(()=>
  {
    console.log('--------askServer.Then!');
  }
  )
      .catch(err => console.error(err));
      console.log('This is the final promot!');
}

askServerListener() {
  console.log('Ask Listen  Started!');

  this.hubConnection.on("askServerResponse", (someText) => {
    console.log('askServer.Listen Started!');
      this.toastr.success(someText)
  })
}
}
