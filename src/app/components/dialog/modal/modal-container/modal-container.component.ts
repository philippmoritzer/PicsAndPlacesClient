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
    this.activatedRoute.params.subscribe(async (params) => {
    });

  }

  ngOnInit(): void {
    console.log("ngOnInit called");
    this.open();
  }

  open() {
    const options = { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'm' };

    const urlParts = this.router.url.split('/'); // check if LocationDetail is called, might want to do it the "angular way"
    if (urlParts[1].toLowerCase() === 'location'.toLowerCase() && /^\d+$/.test(urlParts[2])) { // but works for now
      options.size = 'xl';
    }

    const modalRef = this.modalService.open(this.activatedRoute.firstChild.component,
      options);

    modalRef.componentInstance.modal = modalRef;
    modalRef.componentInstance.parent = this;

    modalRef.result.then((result) => {
      console.log(result);
      if (!isNaN(result)) {
        this.router.navigate([`location/edit/${result}`]).then(res => {
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
