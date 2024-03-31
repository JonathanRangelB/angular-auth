import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  public myForm = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', [Validators.minLength(6), Validators.required]],
    },
    {
      validators: this.passwordMatchValidator(),
    }
  );

  login() {
    console.log(this.myForm.value);
  }

  passwordMatchValidator() {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('passwordConfirm')?.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
