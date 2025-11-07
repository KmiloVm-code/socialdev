import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { User } from '../../core/models/user';
import { Observable, of } from 'rxjs';
import { ModalProfile } from './components/modal-profile/modal-profile';
import { ModalProject } from './components/modal-project/modal-project';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  @ViewChild(ModalProfile) modalProfile!: ModalProfile;
  @ViewChild(ModalProject) modalProject!: ModalProject;
  
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.currentUser$ = this.auth.currentUser$;
  }

  @Output() profileUpdated = new EventEmitter<User>();

  ngAfterViewInit() {
    // You can perform any additional initialization here if needed
  }

  openEditModal() {
    if (this.modalProfile) {
      this.modalProfile.openModal();
    }
  }

  openProjectModal() {
    if (this.modalProject) {
      this.modalProject.openModal();
    }
  }

  onProfileUpdated(updatedProfile: User) {
    this.currentUser$ = of(updatedProfile);
    this.profileUpdated.emit(updatedProfile);
  }

  onProjectAdded(updatedUser: User) {
    this.currentUser$ = of(updatedUser);
    this.profileUpdated.emit(updatedUser);
  }
}
