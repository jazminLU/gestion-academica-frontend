
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Materias } from '../interfaces/Materias';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrearMateriaDto } from '../interfaces/CrearMateriaDto';
import { PagedResult } from '../interfaces/PagedResult';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {


  private ApiUrl: string = `${environment.apiUrl}/Materia`;

  constructor(

    private http: HttpClient

  ) {

  }

  getAll(pageNumber: number = 1, pageSize: number = 10, nombre?: string): Observable<PagedResult<Materias>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (nombre) params = params.set('nombre', nombre);

    return this.http.get<PagedResult<Materias>>(this.ApiUrl, { params });

  }

  getById(id: number): Observable<Materias> {

    return this.http.get<Materias>(`${this.ApiUrl}/${id}`);

  }

  CrearMateria(materia: CrearMateriaDto): Observable<Materias> {
    return this.http.post<Materias>(this.ApiUrl, materia);
  }

  updateMateria(id: number, nombre: string): Observable<void> {
    return this.http.put<void>(`${this.ApiUrl}/${id}`, { nombre });
  }

  eliminarMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}/${id}`);
  }


}
