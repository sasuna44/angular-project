import { Component } from '@angular/core';
import { faTachometerAlt, faBoxOpen, faShoppingCart, faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loginservice } from '../../../services/Login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faTachometerAlt = faTachometerAlt;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;
  faCogs = faCogs;

  constructor(private loginService: Loginservice) {}

  signOut() {
    this.loginService.logout();
  }
}
