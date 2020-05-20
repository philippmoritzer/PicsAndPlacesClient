import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-tooltip',
  templateUrl: './location-tooltip.component.html',
  styleUrls: ['./location-tooltip.component.css']
})
export class LocationTooltipComponent implements OnInit {

  @Input() locationTitle = "Default Value";

  constructor() { }

  ngOnInit(): void {
  }

}
