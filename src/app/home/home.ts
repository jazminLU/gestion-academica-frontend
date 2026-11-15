import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth-service';
import '@lottiefiles/lottie-player';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  get nombreUsuario(): string {
    return this.authService.getUsuario()?.nombre ?? '';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  navegarAlDashboardB() {
    this.router.navigate(['/dashboardB']);
  }

  navegarAlDashboardC() {
    this.router.navigate(['/dashboardC']);
  }
}
