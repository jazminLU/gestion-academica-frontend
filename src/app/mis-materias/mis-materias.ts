import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InscripcionService } from '../services/inscripcion-service';
import { MateriaService } from '../services/materia-service';
import { Inscripcion } from '../interfaces/Inscripcion';
import { Materias } from '../interfaces/Materias';
import { DialogSolicitarInscripcion } from '../dialog-solicitar-inscripcion/dialog-solicitar-inscripcion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-materias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './mis-materias.html',
  styleUrl: './mis-materias.scss',
})
export class MisMaterias implements OnInit {

  inscripciones: Inscripcion[] = [];
  displayedColumns: string[] = ['materia', 'estado', 'fecha'];

  constructor(
    private inscripcionService: InscripcionService,
    private materiaService: MateriaService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.inscripcionService.getMisMaterias().subscribe({
      next: (data) => this.inscripciones = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar tus materias.', 'error'),
    });
  }

  solicitarInscripcion() {
    this.materiaService.getAll(1, 1000).subscribe({
      next: (data) => {
        const noDisponibles = new Set(
          this.inscripciones
            .filter(i => i.estado === 'Pendiente' || i.estado === 'Aprobada')
            .map(i => i.materiaId)
        );
        const materiasDisponibles: Materias[] = data.items.filter(m => !noDisponibles.has(m.id));

        const dialogRef = this.dialog.open(DialogSolicitarInscripcion, {
          data: { materiasDisponibles }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (!result?.materiaId) return;

          this.inscripcionService.solicitar({ materiaId: result.materiaId }).subscribe({
            next: () => {
              Swal.fire('Listo', 'Tu solicitud fue enviada y queda pendiente de aprobación.', 'success');
              this.cargar();
            },
            error: () => Swal.fire('Error', 'No se pudo enviar la solicitud.', 'error'),
          });
        });
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar las materias.', 'error'),
    });
  }
}
