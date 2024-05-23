import { Component, OnInit,NgModule  } from '@angular/core';
import { ProfileService } from '../../services/Profile.service';
import { User } from '../../models/Register.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[CommonModule,RouterModule],
  standalone:true
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  errorMessage: string | null = null;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserData(userId);
  }

  getUserData(userId: number): void {
    this.profileService.getUserData(userId).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.errorMessage = 'An error occurred while fetching user data.';
      }
    );
  }
}
