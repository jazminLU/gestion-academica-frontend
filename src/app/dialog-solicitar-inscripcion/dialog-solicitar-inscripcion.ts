import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Materias } from '../interfaces/Materias';

@Component({
  selector: 'app-dialog-solicitar-inscripcion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Solicitar inscripción</h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Materia</mat-label>
        <mat-select [(ngModel)]="materiaId">
          <mat-option *ngFor="let materia of data.materiasDisponibles" [value]="materia.id">
            {{ materia.nombre }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <p *ngIf="data.materiasDisponibles.length === 0" class="sin-opciones">
        Ya solicitaste o estás inscripto en todas las materias disponibles.
      </p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button class="btn-gradient" (click)="confirmar()" [disabled]="!materiaId">
        Solicitar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: min(360px, 80vw);
      padding-top: 16px !important;
      overflow: visible;
    }
    .sin-opciones {
      color: rgba(0, 0, 0, 0.55);
      font-size: 13px;
      margin: 0;
    }
  `]
})
export class DialogSolicitarInscripcion {

  materiaId: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<DialogSolicitarInscripcion>,
    @Inject(MAT_DIALOG_DATA) public data: { materiasDisponibles: Materias[] },
  ) {}

  confirmar() {
    this.dialogRef.close({ materiaId: this.materiaId });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
