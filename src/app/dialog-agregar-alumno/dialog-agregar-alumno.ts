import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../interfaces/Alumno';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.alumno ? 'Editar alumno' : 'Nuevo alumno' }}</h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="nombre" placeholder="Nombre">
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button class="btn-gradient" (click)="confirmar()" [disabled]="!nombre">
        {{ data.alumno ? 'Guardar' : 'Agregar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: min(380px, 80vw);
      padding-top: 16px !important;
      overflow: visible;
    }
  `]
})
export class AlumnoDialogComponent {

  nombre: string = '';

  constructor(
    private dialogRef: MatDialogRef<AlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alumno?: Alumno },
  ) {
    if (data.alumno) {
      this.nombre = data.alumno.nombre;
    }
  }

  confirmar() {
    this.dialogRef.close({
      nombre: this.nombre,
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
