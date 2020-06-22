import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-modal-container-dashboard',
  templateUrl: './modal-container-dashboard.component.html',
  styleUrls: ['./modal-container-dashboard.component.css']
})
export class ModalContainerDashboardComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router,
    private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.open();
  }

  open() {
    const options = { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', windowClass: 'dashboardModal' };
    const modalRef = this.modalService.open(DashboardComponent,
      options);
    modalRef.componentInstance.modal = modalRef;

    modalRef.result.then((result) => {
      if (result) {
        if (result.reason === 'detail' && result.type === 'location') {
          this.router.navigateByUrl(`/location/${result.id}`);
        } else if (result.reason === 'edit' && result.type === 'location') {
          this.router.navigateByUrl(`/location/edit/${result.id}`);
        } else if (result.reason === 'detail' && result.type === 'tour') {
          this.router.navigateByUrl(`/tour/${result.id}`);
        } else if (result.reason === 'edit' && result.type === 'tour') {
          this.router.navigateByUrl(`/tour/edit/${result.id}`);
        } else {
          this.router.navigateByUrl('/');
        }
      } else {
        this.router.navigateByUrl('/');
      }
    }, (reason) => {
      this.router.navigateByUrl('/');
    });
  }

}
