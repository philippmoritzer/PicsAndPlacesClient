import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  modal;
  signupForm;
  error;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      signupmail: new FormControl('', [Validators.required, Validators.email]),
      signuppassword: new FormControl('', [Validators.required]),
      signupname: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.modal.close();
    }
  }


  onSubmit() {
    const mail = this.signupForm.value.signupmail;
    const password = this.signupForm.value.signuppassword;
    const name = this.signupForm.value.signupname;
    const user: User = new User(mail, name, 1, password);
    this.authService.signupAPI(user).subscribe(result => {
      this.authService.login(result);
      this.modal.close();
    }, err => {
      this.error = true;
    });

  }

}
