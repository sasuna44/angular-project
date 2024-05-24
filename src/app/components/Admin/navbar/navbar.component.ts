import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loginservice } from '../../../services/Login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {

  constructor(private loginService: Loginservice) {}

  signOut() {
    this.loginService.logout();
  }
}
