import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss', './sign-in-page-cols.scss'],
})
export class SignInPageComponent implements OnInit {
  signInForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  //user SignIn
  signIn() {
    //check if the form is valid
    if (this.signInForm.invalid) {
      this.error = 'Error: Please fill in all the fields';
      return;
    }

    this.api
      .signIn(this.signInForm.value.username, this.signInForm.value.password)
      .subscribe(
        (user) => {
          this.error = '';
          if (user.user.gender === 'female') {
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
