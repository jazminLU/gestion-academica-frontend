import { Usuario } from './Usuario';

export interface LoginResponse {
    token: string;
    usuario: Usuario;
}
