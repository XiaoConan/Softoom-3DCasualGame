import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', './home-page-cols.scss'],
})
export class HomePageComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    // clear all cookies
    this.cookieService.deleteAll();
  }
}
