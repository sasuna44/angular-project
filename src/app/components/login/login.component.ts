import { Component } from '@angular/core';
import { Loginservice } from '../../services/Login.service';
import { Router } from '@angular/router';
import { Login, Auth } from '../../models/Register.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt ,faShoppingCart,faHeart} from '@fortawesome/free-solid-svg-icons';  // Import the specific icon

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  Login: Login = new Login("", "");
  errorMessage: string | null = null;
  faSignInAlt = faSignInAlt;  // Add this line to define the icon
  faShoppingCart=faShoppingCart;
  faHeart = faHeart;
  constructor(
    private loginService: Loginservice,
    private router: Router
  ) {}

  login(LoginForm: NgForm): void {
    if (LoginForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.loginService.login(this.Login).subscribe(
      (response: Auth) => {
        console.log(response);
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        if (response.user.id) {
          localStorage.setItem('id', response.user.id.toString());
          console.log(response.user);
          if(response.user.role == "user"){
            console.log(response.user.id);
            this.router.navigateByUrl(`/profile/${response.user.id}`);
          } else {
            this.router.navigateByUrl('admin');
          }
        }

        console.log(this.loginService.getTokenFromLocalStorage());
        this.errorMessage = null;
      },
      (error) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}

//login
