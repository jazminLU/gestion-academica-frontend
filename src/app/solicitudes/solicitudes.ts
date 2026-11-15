import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InscripcionService } from '../services/inscripcion-service';
import { Inscripcion } from '../interfaces/Inscripcion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})
export class Solicitudes implements OnInit {

  pendientes: Inscripcion[] = [];
  displayedColumns: string[] = ['alumno', 'materia', 'fecha', 'acciones'];

  constructor(private inscripcionService: InscripcionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.inscripcionService.getPendientes().subscribe({
      next: (data) => this.pendientes = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar las solicitudes.', 'error'),
    });
  }

  aprobar(inscripcion: Inscripcion) {
    Swal.fire({
      title: '¿Aprobar inscripción?',
      text: `${inscripcion.alumnoNombre} quedará inscripto en "${inscripcion.materiaNombre}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#5b21b6',
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.inscripcionService.aprobar(inscripcion.id).subscribe({
        next: () => {
          Swal.fire('Aprobada', 'La inscripción fue aprobada.', 'success');
          this.cargar();
        },
        error: () => Swal.fire('Error', 'No se pudo aprobar la inscripción.', 'error'),
      });
    });
  }

  rechazar(inscripcion: Inscripcion) {
    Swal.fire({
      title: '¿Rechazar inscripción?',
      text: `Se rechazará el pedido de ${inscripcion.alumnoNombre} a "${inscripcion.materiaNombre}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.inscripcionService.rechazar(inscripcion.id).subscribe({
        next: () => {
          Swal.fire('Rechazada', 'La inscripción fue rechazada.', 'success');
          this.cargar();
        },
        error: () => Swal.fire('Error', 'No se pudo rechazar la inscripción.', 'error'),
      });
    });
  }
}
