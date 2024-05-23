import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/Profile.service';
import { User } from '../../models/Register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  imports:[CommonModule,FormsModule],
  selector: 'app-editprofile',
  standalone: true,
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  user: User = new User('', '', '', 'male');
  errorMessage: string | null = null;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
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

  submit(EditForm: NgForm): void {
    if (EditForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
    if (this.user) {
      this.profileService.updateUser(this.user).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/profile', this.user.id]);
        },
        (error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'An error occurred while updating user data.';
        }
      );
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}