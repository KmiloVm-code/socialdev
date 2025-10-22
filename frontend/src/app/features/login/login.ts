import { Component, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  returnUrl: string = '/feed';
  loginForm!: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/feed']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Obtener URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/feed';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.controls[key].markAsTouched();
      });
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (auth) => {
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      },
    });
  }
}
