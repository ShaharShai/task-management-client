import { Component } from '@angular/core';
import { SocketioService } from './services/socket/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tasks-app';

  constructor(){
    
  }
}
