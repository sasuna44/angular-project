import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loginservice } from '../../../services/Login.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private loginService: Loginservice) {}

  signOut() {
    this.loginService.logout();
  }

}
