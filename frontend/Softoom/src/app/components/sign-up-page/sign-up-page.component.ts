import { Component, NgModule, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss', './sign-up-page-cols.scss'],
})
export class SignUpPageComponent implements OnInit {

  signUpForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      roomType: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signUp() {
    //check if the form is valid
    if (this.signUpForm.invalid) {
      this.error = 'Error: Please fill in all the fields';
      console.log(this.error);
      return;
    }

    this.api.signUp(this.signUpForm.value.username, this.signUpForm.value.password, this.signUpForm.value.gender, this.signUpForm.value.roomType).subscribe({
      next: () => {
        this.error = '';
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error.error;
      }
    });
  }
}
