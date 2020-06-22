import { Constants } from './../../../misc/constants';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modal;
  loginForm;
  error: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      loginmail: new FormControl('', [Validators.required, Validators.email]),
      loginpassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.modal.close();
    }
  }

  onSubmit() {

    const user = this.loginForm.value.loginmail;
    const password = this.loginForm.value.loginpassword;
    this.authService.loginAPI({ mail: user, password: password }).subscribe(result => {

      this.authService.login(result);
      this.modal.close();
    }, err => {
      this.error = true;
    });
  }

  navigateToSignup() {
    this.modal.close('signup');
    this.router.navigateByUrl('/auth/signup');
  }


}
