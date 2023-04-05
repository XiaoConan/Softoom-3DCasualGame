import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss', './sign-up-page-cols.scss'],
})
export class SignUpPageComponent implements OnInit {
  signUpForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.signUpForm = this.fb.group({
      //username must be an email
      username: ['', Validators.email],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      roomType: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signUp() {
    //check if the form is valid
    if (this.signUpForm.invalid) {
      this.error = 'Error: Please fill all the fields with valid data';
      return;
    }

    this.api
      .signUp(
        this.signUpForm.value.username,
        this.signUpForm.value.password,
        this.signUpForm.value.gender,
        this.signUpForm.value.roomType
      )
      .subscribe(
        (user) => {
          this.error = '';
          if (user.gender === 'female') {
            this.cookieService.set('username', user.user.username);
            this.router.navigate(['/room/female']);
          } else {
            this.cookieService.set('username', user.user.username);
            this.router.navigate(['/room/male']);
          }
        },
        (error) => {
          this.error = error.error.error;
        }
      );
  }
}
