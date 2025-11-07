import { Component, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/feed']);
    }

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.controls[key].markAsTouched();
      });
      return;
    }

    const { name, email, password } = this.registerForm.value;
    
    this.authService.register(name, email, password).subscribe({
      next: (response) => {
        this.successMessage = 'Registro exitoso! Iniciando sesión...';
        
        // Después del registro exitoso, hacer login automático
        this.authService.login(email, password).subscribe({
          next: (auth) => {
            // Redirigir al perfil después del login
            setTimeout(() => {
              this.router.navigate(['/profile']);
            }, 1000);
          },
          error: (loginError) => {
            console.error('Auto-login failed:', loginError);
            // Si falla el login automático, redirigir al login manual
            this.successMessage = 'Registro exitoso! Redirigiendo al login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        });
      },
      error: (error) => {
        console.error('Register failed:', error);
        this.errorMessage = error.error?.error || 'Error al registrar. Por favor, intenta de nuevo.';
      },
    });
  }
}
