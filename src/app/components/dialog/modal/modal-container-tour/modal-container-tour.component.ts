import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-container-tour',
  templateUrl: './modal-container-tour.component.html',
  styleUrls: ['./modal-container-tour.component.css']
})
export class ModalContainerTourComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(async (params) => {
    });
  }

  ngOnInit(): void {
    this.open();
  }

  open() {
    const options = { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'm' };
    const modalRef = this.modalService.open(this.activatedRoute.firstChild.component,
      options);
    modalRef.componentInstance.modal = modalRef;

    modalRef.result.then((result) => {
      if (!isNaN(result)) {
        this.router.navigate([`tour/edit/${result}`]).then(res => {
          this.ngOnInit();
        });
      } else {
        this.router.navigateByUrl('/');
      }
    }, (reason) => {
      this.router.navigateByUrl('/');

    });
  }
}


