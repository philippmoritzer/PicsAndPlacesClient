import { LocationService } from './../../../services/location.service';
import { Media } from './../../../models/media';
import { ConfigService } from './../../../services/config.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMenuCollapsed = true;

  constructor() { }



}
