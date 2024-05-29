import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar-component/navbar-component.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
