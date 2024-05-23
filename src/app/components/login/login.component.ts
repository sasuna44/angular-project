import { Component } from '@angular/core';
import { Loginservice } from '../../services/Login.service';
import { Router } from '@angular/router';
import { Login, Auth } from '../../models/Register.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  Login: Login = new Login("", "");
  errorMessage: string | null = null;

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
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.data._id);
        console.log(response.data.name);
        const loginId = response.data._id;
        // this.router.navigateByUrl(`/loginlist/details/${loginId}`);
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
