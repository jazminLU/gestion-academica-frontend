import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../interfaces/Alumno';
import { CrearAlumnoDto } from '../interfaces/CrearAlumnoDto';
import { PagedResult } from '../interfaces/PagedResult';


@Injectable({
  providedIn: 'root',
})
export class alumnosService {

  private ApiUrl: string = `${environment.apiUrl}/Alumno`;

  // https://localhost:7124/api


  constructor(

    private http: HttpClient

  ) { }


  getAll(pageNumber: number = 1, pageSize: number = 10, nombre?: string): Observable<PagedResult<Alumno>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (nombre) params = params.set('nombre', nombre);

    return this.http.get<PagedResult<Alumno>>(this.ApiUrl, { params });

  }


  getById(id: number): Observable<Alumno> {

    return this.http.get<Alumno>(`${this.ApiUrl}/${id}`);

  }

  create(alumno: CrearAlumnoDto): Observable<Alumno> {

    return this.http.post<Alumno>(this.ApiUrl, alumno);

  }

  update(id: number, alumno: CrearAlumnoDto): Observable<void> {

    return this.http.put<void>(`${this.ApiUrl}/${id}`, alumno);

  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(`${this.ApiUrl}/${id}`);
    
  }

}
