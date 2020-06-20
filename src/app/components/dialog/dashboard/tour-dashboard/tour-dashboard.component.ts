import { Tour } from './../../../../models/tour';
import { UserDataService } from './../../../../services/user-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.css']
})
export class TourDashboardComponent implements OnInit {

  @Input() modal;
  userTours: Tour[] = [];
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getToursByUserAPI().subscribe(result => {
      this.userTours = result;
    });
  }

  navigateToEditTour(tourId: number) {
    this.modal.close({ type: 'tour', reason: 'edit', id: tourId });
  }

  navigateToDetailTour(tourId: number) {
    this.modal.close({ type: 'tour', reason: 'detail', id: tourId });
  }

}
