import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Inscripcion } from '../interfaces/Inscripcion';
import { SolicitarInscripcionDto } from '../interfaces/SolicitarInscripcionDto';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {

  private ApiUrl: string = `${environment.apiUrl}/Inscripcion`;

  constructor(private http: HttpClient) {}

  getMisMaterias(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.ApiUrl}/mis-materias`);
  }

  solicitar(dto: SolicitarInscripcionDto): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.ApiUrl, dto);
  }

  getPendientes(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.ApiUrl}/pendientes`);
  }

  aprobar(id: number): Observable<void> {
    return this.http.put<void>(`${this.ApiUrl}/${id}/aprobar`, {});
  }

  rechazar(id: number): Observable<void> {
    return this.http.put<void>(`${this.ApiUrl}/${id}/rechazar`, {});
  }
}
