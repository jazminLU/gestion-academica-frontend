import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Alumno } from '../interfaces/Alumno';
import { alumnosService } from '../services/AlumnoService';
import Swal from 'sweetalert2';
import { AlumnoDialogComponent } from '../dialog-agregar-alumno/dialog-agregar-alumno';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss',
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[] = [];
  displayedColumns: string[];

  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;
  filtroNombre = '';

  constructor(
    private alumnosService: alumnosService,
    private dialog: MatDialog,
    public authService: AuthService,
  ) {
    this.displayedColumns = this.authService.isAdmin()
      ? ['id', 'nombre', 'email', 'materia', 'acciones']
      : ['id', 'nombre', 'email', 'materia'];
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnosService.getAll(this.pageIndex + 1, this.pageSize, this.filtroNombre || undefined).subscribe({

      next: (data) => {
        this.alumnos = data.items;
        this.totalItems = data.totalCount;
      },

      error: (err) => {
        console.error('Error al traer alumnos', err);
        Swal.fire('Error', 'No se pudieron cargar los alumnos porque se cayo el servidor.', 'error');
      },

    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarAlumnos();
  }

  buscar() {
    this.pageIndex = 0;
    this.cargarAlumnos();
  }

  agregarAlumno() {

    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      this.alumnosService.create(result).subscribe({

        next: () => {
          Swal.fire('Listo', 'Alumno agregado correctamente.', 'success');
          this.cargarAlumnos();
        },

        error: () => Swal.fire('Error', 'No se pudo agregar el alumno.', 'error')

      });
    });

  }

  editarAlumno(alumno: Alumno) {

    const dialogRef = this.dialog.open(AlumnoDialogComponent, {
      data: { alumno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.alumnosService.update(alumno.id, result).subscribe({
        next: () => {

          Swal.fire('Guardado', 'Alumno actualizado correctamente.', 'success');
          this.cargarAlumnos();

        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el alumno.', 'error')
      });
    });

  }

  eliminar(alumno: Alumno) {
    Swal.fire({
      title: '¿Eliminar alumno?',
      text: `Vas a eliminar a ${alumno.nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.alumnosService.delete(alumno.id).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El alumno fue eliminado.', 'success');
          this.cargarAlumnos();
        },
        error: () => Swal.fire('Error', 'No se pudo eliminar el alumno.', 'error')
      });
    });
  }
}