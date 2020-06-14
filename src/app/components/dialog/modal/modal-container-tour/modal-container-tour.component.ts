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
    const options = { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' };
    const modalRef = this.modalService.open(this.activatedRoute.firstChild.component,
      options);
    console.log(this.activatedRoute.firstChild.component);
    modalRef.componentInstance.modal = modalRef;
    console.log("I'M HERE");
    modalRef.result.then((result) => {
      this.router.navigateByUrl('/');
    }, (reason) => {
      this.router.navigateByUrl('/');

    });
  }
}


