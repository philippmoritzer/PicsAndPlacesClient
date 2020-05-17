import { Media } from './../../../models/media';
import { ConfigService } from './../../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {


  }

}
