import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/Register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private tokenKey = 'token'
  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}`, formData);
  }
  getTokenFromLocalStorage(): string | null {
    console.log(localStorage.getItem(this.tokenKey) )
    return localStorage.getItem(this.tokenKey); 
  }
  getCurrentUser(): string | null {
    return localStorage.getItem('id'); 
  }
}
