import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm = this.fb.group({
    email: ['jonathan@jorab.dev', [Validators.email, Validators.required]],
    password: ['123456', [Validators.minLength(6), Validators.required]],
  });

  login() {
    const { email, password } = this.myForm.value;
    if (!email || !password) return;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }
}
