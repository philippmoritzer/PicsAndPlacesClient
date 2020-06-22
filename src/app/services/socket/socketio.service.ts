import { MapService } from './../maps/map.service';
import { LocationService } from './../location.service';
import { Location } from './../../models/location';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor(private config: ConfigService, private locationService: LocationService,
    private mapService: MapService) { }

  setup() {
    this.socket = io(this.config.mediaUrl);
    this.socket.on('locationinsert', (data: Location) => {
      this.locationService.locations.push(data);
      this.locationService.tempLocations.push(data);
      setTimeout(() => {
        this.locationService.tempLocations.splice(this.locationService.tempLocations.indexOf(data), 1);
      }, 20000);
      if (!(this.mapService.locationLayer.find(loc => loc.locationId === data.id))) {
        this.mapService.drawMarker(data);
      }
    });

    this.socket.on('locationdelete', (data) => {
      this.mapService.deleteMarker(data.data);
    });
  }
}
