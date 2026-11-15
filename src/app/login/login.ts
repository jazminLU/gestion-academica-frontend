import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { LoginDto } from '../interfaces/LoginDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  credenciales: LoginDto = { email: '', password: '' };
  cargando = false;
  mostrarPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onSubmit() {
    this.cargando = true;
    this.authService.login(this.credenciales).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        this.cargando = false;
        Swal.fire('Error', 'Credenciales invalidas.', 'error');
      },
    });
  }
}
