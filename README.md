# Gestión Académica — Frontend

Frontend en **Angular 20** con **Angular Material** para el sistema de
gestión de Alumnos y Materias. Consume la API REST de
[CLASE_ORM](https://github.com/jazminLU/CLASE_ORM) (ASP.NET Core 8 +
Clean Architecture + JWT).

## Tecnologías

- Angular 20 (standalone components)
- Angular Material (tablas, diálogos, formularios, paginador)
- Chart.js (dashboard de estadísticas)
- SweetAlert2 (confirmaciones y mensajes)

## Funcionalidades

- **Login y registro** con JWT: el token se guarda en `localStorage`, un
  interceptor lo agrega automáticamente a cada request (`Authorization:
  Bearer <token>`) y un guard redirige a `/login` si no hay sesión.
- **Autorización por roles** (Admin / Usuario): los botones de crear,
  editar y eliminar solo se muestran si el usuario logueado es Admin.
- **Paginación y filtrado** server-side en Alumnos y Materias con
  `MatPaginator` y un buscador por nombre.
- ABM de **Alumnos** y **Materias** con validaciones y diálogos de confirmación.
- **Dashboard** con estadísticas y gráficos (alumnos por materia).
- Documentación interactiva de la API con **Swagger** (del lado del backend).
- Diseño **responsive** con menú hamburguesa.

### Usuarios de prueba

| Rol     | Email                        | Contraseña     |
|---------|------------------------------|----------------|
| Admin   | `jazmin.test@example.com`    | `MiClave123!`  |
| Usuario | `iaz@test.com`               | `qwerty123`    |

## Cómo levantar el proyecto

### Requisitos

- Node.js y npm
- La API [CLASE_ORM](https://github.com/jazminLU/CLASE_ORM) corriendo
  (ver su propio README para levantarla)

### Pasos

```bash
npm install
ng serve
```

La app queda disponible en `http://localhost:4200`.

> Si la API corre en una URL distinta a la configurada por default,
> actualizá `apiUrl` en `src/environments/environment.ts` (producción) y
> `src/environments/environment.development.ts` (desarrollo).
