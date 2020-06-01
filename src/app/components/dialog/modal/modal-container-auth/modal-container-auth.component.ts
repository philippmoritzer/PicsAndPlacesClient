import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-container-auth',
  templateUrl: './modal-container-auth.component.html',
  styleUrls: ['./modal-container-auth.component.css']
})
export class ModalContainerAuthComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.open();
  }

  open() {
    const options = { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' };
    const modalRef = this.modalService.open(this.activatedRoute.firstChild.component,
      options);
    modalRef.componentInstance.modal = modalRef;

    modalRef.result.then((result) => {
      this.router.navigateByUrl('/');
    }, (reason) => {
      this.router.navigateByUrl('/');

    });
  }

}
