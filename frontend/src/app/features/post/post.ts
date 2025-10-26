import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { createPost, Post as PostModel } from '../../core/models/post';
import { Post as PostService } from '../../core/services/post/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: false,
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  @Output() postCreated = new EventEmitter<PostModel>();
  postForm!: FormGroup;
  selectedImage: File | null = null;
  selectedImageName: string = '';
  selectedFiles: File[] = [];
  imagePreview: string | null = null;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
      image: [''],
      attachments: [''],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Agregar archivos adjuntos (pueden ser múltiples)
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        // Validar que no sea una imagen
        if (!file.type.startsWith('image/')) {
          this.selectedFiles.push(file);
        }
      }
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar que sea una imagen
      if (file.type.startsWith('image/')) {
        this.selectedImage = file;
        this.selectedImageName = file.name;

        // Mostrar vista previa
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor selecciona una imagen válida');
      }
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.selectedImageName = '';
    this.imagePreview = null;
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

// Crear FormData para enviar archivos
    const formData = new FormData();
    formData.append('title', this.postForm.value.title);
    formData.append('content', this.postForm.value.content);
    
    if (this.postForm.value.tags) {
      formData.append('tags', this.postForm.value.tags);
    }
    
    // Agregar imagen si existe
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    
    // Agregar archivos adjuntos si existen
    this.selectedFiles.forEach(file => {
      formData.append('attachments', file);
    });

    this.postService.createPost(formData).subscribe({
      next: (post) => {
        this.postCreated.emit(post);
        this.postForm.reset();
        this.removeImage();
        this.selectedFiles = [];
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        alert('Error al crear el post. Inténtalo de nuevo.');
      },
    });
  }
}
