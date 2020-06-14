import { ActivatedRoute } from '@angular/router';
import { TourService } from './../../../../services/tour.service';
import { ConfigService } from './../../../../services/config.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  @Input() modal;
  @Input() parent;
  tour;
  constructor(private config: ConfigService, private tourService: TourService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.firstChild.firstChild.params.subscribe(params => {
      const tourId: number = params.id;
      console.log(tourId);
      console.log(params);
      this.tourService.getTourByIdAPI(tourId).subscribe(result => {
        this.tour = result;
      });
    });

  }

}
