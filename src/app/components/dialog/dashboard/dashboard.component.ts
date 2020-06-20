import { AuthService } from './../../../services/auth/auth.service';
import { User } from './../../../models/user';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Rating } from './../../../models/rating';
import { RatingService } from './../../../services/rating.service';
import { Media } from './../../../models/media';
import { ConfigService } from './../../../services/config.service';
import { Location } from './../../../models/location';
import { LocationService } from './../../../services/location.service';
import { NgbModal, NgbTabChangeEvent, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, Host, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @Input() parent;
  @Input() modal;
  @ViewChild('tabset', { static: true }) tabset: any;
  currentOrientation = 'vertical';
  active = '';




  constructor(private config: ConfigService, private authService: AuthService, private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    switch (this.getSubRoute()) {
      case "user":
        this.active = 'dashboardUserNav';
        break;
      case "location":
        this.active = 'dashboardLocationNav';
        break;
      case "tour":
        this.active = 'dashboardTourNav';
        break;
    }
  }


  /**
   * FIXME: There is a big workaround going on here since child routing
   * didn't seem to work. Might do it the Angular way soon, but routing the
   * Tabs works for now.
   */
  onNavChange($event: NgbNavChangeEvent) {
    console.log(this.active);
    if ($event.nextId === 'dashboardUserNav') {

      this.router.navigate(['/dashboard', { outlets: { sub: 'user' } }], { relativeTo: this.route });

    } else if ($event.nextId === 'dashboardLocationNav') {
      this.router.navigate(['/dashboard', { outlets: { sub: 'location' } }], { relativeTo: this.route });
    } else if ($event.nextId === 'dashboardTourNav') {
      this.router.navigate(['/dashboard', { outlets: { sub: 'tour' } }], { relativeTo: this.route });
    }
  }


  get mediaUrl() {
    return this.config.mediaUrl;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  getSubRoute(): string {
    return this.router.url.substr(this.router.url.indexOf('(') + 1,
      (this.router.url.indexOf(')') - this.router.url.indexOf('(')) - 1).split(':')[1];
  }

}
