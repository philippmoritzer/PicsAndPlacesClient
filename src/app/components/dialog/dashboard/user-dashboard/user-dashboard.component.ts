import { UserDataService } from './../../../../services/user-data.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit, Input, ɵɵresolveBody } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  @Input() modal;

  oldPw;
  newPw;
  message;
  errMessage;


  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.message = null;
    this.errMessage = null;
    const userPwObj = {
      "userId": this.authService.currentUser.id,
      "oldPassword": this.oldPw,
      "newPassword": this.newPw
    };
    this.authService.changePasswordAPI(userPwObj).subscribe(result => {
      console.log(result);
      if (result.body.success) {
        this.message = result.body.success;
      }
    }, (err) => {
      console.log(err);
      if (err.error.error) {
        this.errMessage = err.error.error;
      } else {
        this.errMessage = "Something went wrong!";
      }
    });
  }

  get currentUser(): User {
    return this.authService.currentUser;
  }

}
