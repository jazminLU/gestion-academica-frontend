import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDto } from '../interfaces/LoginDto';
import { RegistrarDto } from '../interfaces/RegistrarDto';
import { Usuario } from '../interfaces/Usuario';
import { LoginResponse } from '../interfaces/LoginResponse';

const TOKEN_KEY = 'auth_token';
const USUARIO_KEY = 'auth_usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private ApiUrl: string = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.ApiUrl}/login`, dto).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USUARIO_KEY, JSON.stringify(res.usuario));
      })
    );
  }

  register(dto: RegistrarDto): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.ApiUrl}/register`, dto);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUsuario(): Usuario | null {
    const raw = localStorage.getItem(USUARIO_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isAdmin(): boolean {
    return this.getUsuario()?.rol === 'Admin';
  }
}
