import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user/user';

@Component({
  selector: 'app-modal-project',
  standalone: false,
  templateUrl: './modal-project.html',
  styleUrl: './modal-project.css',
})
export class ModalProject {
  @ViewChild('modalProject', { static: false }) modalElement!: ElementRef<HTMLDialogElement>;
  @Input() userId: string = '';

  projectForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      url: [''],
    });
  }

  @Output() projectAdded = new EventEmitter<User>();

  openModal() {
    if (this.modalElement?.nativeElement) {
      this.modalElement.nativeElement.showModal();
    }
  }

  closeModal() {
    if (this.modalElement?.nativeElement) {
      this.projectForm.reset();
      this.modalElement.nativeElement.close();
    }
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    const newProject: Project = {
      title: this.projectForm.value.title,
      description: this.projectForm.value.description,
      image: this.projectForm.value.image || '',
      url: this.projectForm.value.url || '',
    };

    // Llamar al servicio para agregar el proyecto
    this.userService.addProject(this.userId, newProject).subscribe((updatedUser) => {
      this.projectAdded.emit(updatedUser);
      this.closeModal();
    });
  }
}
