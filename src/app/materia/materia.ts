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
import { MateriaService } from '../services/materia-service';
import { Materias } from '../interfaces/Materias';
import { DialogAgregarMateria } from '../dialog-agregar-materia/dialog-agregar-materia';
import { AuthService } from '../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia',
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
  templateUrl: './materia.html',
  styleUrl: './materia.scss',
})
export class Materia implements OnInit {

  materias: Materias[] = [];
  displayedColumns: string[];

  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;
  filtroNombre = '';

  constructor(
    private materiaService: MateriaService,
    private dialog: MatDialog,
    public authService: AuthService,
  ) {
    this.displayedColumns = this.authService.isAdmin()
      ? ['id', 'nombre', 'acciones']
      : ['id', 'nombre'];
  }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiaService.getAll(this.pageIndex + 1, this.pageSize, this.filtroNombre || undefined).subscribe({
      next: (data) => {
        this.materias = data.items;
        this.totalItems = data.totalCount;
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar las materias.', 'error'),
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarMaterias();
  }

  buscar() {
    this.pageIndex = 0;
    this.cargarMaterias();
  }

  agregarMateria() {
    const dialogRef = this.dialog.open(DialogAgregarMateria, { data: {} });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.materiaService.CrearMateria(result).subscribe({
        next: () => {
          Swal.fire('Listo', 'Materia agregada correctamente.', 'success');
          this.cargarMaterias();
        },
        error: () => Swal.fire('Error', 'No se pudo agregar la materia.', 'error'),
      });
    });
  }

  editarMateria(materia: Materias) {
    const dialogRef = this.dialog.open(DialogAgregarMateria, { data: { materia } });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.materiaService.updateMateria(materia.id, result.nombre).subscribe({
        next: () => {
          Swal.fire('Guardado', 'Materia actualizada correctamente.', 'success');
          this.cargarMaterias();
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar la materia.', 'error'),
      });
    });
  }

  eliminar(materia: Materias) {
    Swal.fire({
      title: '¿Eliminar materia?',
      text: `Vas a eliminar "${materia.nombre}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.materiaService.eliminarMateria(materia.id).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'La materia fue eliminada.', 'success');
          this.cargarMaterias();
        },
        error: () => Swal.fire('Error', 'No se pudo eliminar la materia.', 'error'),
      });
    });
  }
}
