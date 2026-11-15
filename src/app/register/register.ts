import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { RegistrarDto } from '../interfaces/RegistrarDto';
import Swal from 'sweetalert2';
import '@lottiefiles/lottie-player';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  nuevoUsuario: RegistrarDto = { nombre: '', email: '', password: '' };
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
    this.authService.register(this.nuevoUsuario).subscribe({
      next: () => {
        this.cargando = false;
        Swal.fire('Listo', 'Cuenta creada correctamente. Inicia sesion.', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.cargando = false;
        const mensaje = err.status === 409
          ? 'El email ya esta registrado.'
          : 'No se pudo crear la cuenta.';
        Swal.fire('Error', mensaje, 'error');
      },
    });
  }
}
