import { Location } from './../../../models/location';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-tooltip',
  templateUrl: './location-tooltip.component.html',
  styleUrls: ['./location-tooltip.component.css']
})
export class LocationTooltipComponent implements OnInit {

  @Input() location: Location = null;

  constructor() { }

  ngOnInit(): void {
  }

}
