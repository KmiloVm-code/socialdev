import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user/user';

@Component({
  selector: 'app-modal-profile',
  standalone: false,
  templateUrl: './modal-profile.html',
  styleUrl: './modal-profile.css',
})
export class ModalProfile {
  @ViewChild('modalProfile', { static: false }) modalElement!: ElementRef<HTMLDialogElement>;
  @Input() profile: User = {} as User;

  profileForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      avatar: [this.profile.avatar, Validators.required],
      name: [this.profile.name, Validators.required],
      email: [{value: this.profile.email, disabled: true}, [Validators.required, Validators.email]],
      profession: [this.profile.profession, Validators.required],
      bio: [this.profile.bio, Validators.required],
      skills: [this.profile.skills?.join(', ') || '', Validators.required],
    });
  }

  @Output() close = new EventEmitter<void>();
  @Output() profileUpdated = new EventEmitter<User>();

  openModal() {
    if (this.modalElement?.nativeElement) {
      this.modalElement.nativeElement.showModal();
    }
  }

  closeModal() {
    if (this.modalElement?.nativeElement) {
      this.modalElement.nativeElement.close();
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    const updatedData: Partial<User> = {
      avatar: this.profileForm.value.avatar,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      profession: this.profileForm.value.profession,
      bio: this.profileForm.value.bio,
      skills: this.profileForm.value.skills.split(',').map((skill: string) => skill.trim()),
    };
    this.userService.updateUser(this.profile._id, updatedData).subscribe((updatedProfile) => {
      this.profileUpdated.emit(updatedProfile);
    });
    this.closeModal();
  }
}
