export interface Inscripcion {
    id: number;
    materiaId: number;
    materiaNombre: string;
    alumnoId: number;
    alumnoNombre: string;
    estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
    fechaSolicitud: string;
}
