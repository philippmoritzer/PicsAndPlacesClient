import { Location } from './../../../models/location';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-tooltip',
  templateUrl: './location-tooltip.component.html',
  styleUrls: ['./location-tooltip.component.css']
})
export class LocationTooltipComponent implements OnInit {

  @Input() location: Location = null;
  imageexists: boolean = false;
  imageUrl: string = 'http://localhost:3001/';

  constructor() { }

  ngOnInit(): void {
    if (this.location.mediaList[0]) {
      this.imageexists = true;
      this.imageUrl = this.imageUrl + this.location.mediaList[0].mediapath;
    }
  }


}
