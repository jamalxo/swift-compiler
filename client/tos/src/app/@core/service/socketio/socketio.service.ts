import { Injectable } from '@angular/core';
import { io } from 'socket.io-client/build/index';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: any;

  constructor() {}

  setupSocketConnection(): any {
    this.socket = io(environment.apiUrl);
    // this.socket.on('script', (data: string) => {
    //   console.log(data);
    // });
    return this.socket;
  }
}
