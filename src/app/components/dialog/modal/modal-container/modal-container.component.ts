import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit {


  constructor(private modalService: NgbModal, private router: Router,
    private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {

    this.open();


  }

  open() {
    const modalRef = this.modalService.open(this.activatedRoute.firstChild.component, { ariaLabelledBy: 'modal-basic-title', centered: true });
    modalRef.componentInstance.modal = modalRef;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.router.navigateByUrl('/');
    });

  }



}
