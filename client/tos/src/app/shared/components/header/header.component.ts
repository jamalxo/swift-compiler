import { Component } from '@angular/core';
import { UserService } from '../../../@core/service/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public userService: UserService, private router: Router) {}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['landing-page']);
  }
}
