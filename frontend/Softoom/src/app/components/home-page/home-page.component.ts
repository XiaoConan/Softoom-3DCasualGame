import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', './home-page-cols.scss'],
})
export class HomePageComponent {
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {}
}
