import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Materia } from '../materia/materia';

@Component({
  selector: 'app-dialog-agregar-materia',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-agregar-materia.html',
  styleUrl: './dialog-agregar-materia.scss',
})
export class DialogAgregarMateria {


  nombre: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogAgregarMateria>,
    @Inject(MAT_DIALOG_DATA) public data: { materia?: Materia },
  ) {
    if (data.materia) {
      this.nombre = (data.materia as any).nombre;
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
