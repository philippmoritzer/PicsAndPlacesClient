import { SocketioService } from './services/socket/socketio.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'PicsAndPlacesClient';

  constructor(private socketioService: SocketioService) {

  }

  ngOnInit(): void {
    this.socketioService.setup();
  }

}
