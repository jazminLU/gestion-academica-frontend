import { Routes } from '@angular/router';
import { DashboardB } from './dashboard-b/dashboard-b';
import { authGuard } from './auth-guard';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () =>
            import('./login/login').then(m => m.Login)
    },

    {
        path: 'register',
        loadComponent: () =>
            import('./register/register').then(m => m.Register)
    },

    {
        path: '',
        loadComponent: () =>
            import('./home/home').then(m => m.Home),
        canActivate: [authGuard]
    },

    {
        path: 'home',
        loadComponent: () =>
            import('./home/home').then(m => m.Home),
        canActivate: [authGuard]
    },

    {
        path: 'dashboardA',
        loadComponent: () =>
            import('./dashboard-a/dashboard-a').then(m => m.DashboardA),
        canActivate: [authGuard]

    },

    {
        path: 'dashboardB',
        loadComponent: () =>
            import('./dashboard-b/dashboard-b').then(m => m.DashboardB),
        canActivate: [authGuard]
    },

    {
        path: 'dashboardC',
        loadComponent: () =>
            import('./dashboard-c/dashboard-c').then(m => m.DashboardC),
        canActivate: [authGuard]
    },

    {
        path: 'mis-materias',
        loadComponent: () =>
            import('./mis-materias/mis-materias').then(m => m.MisMaterias),
        canActivate: [authGuard]
    },

    {
        path: 'solicitudes',
        loadComponent: () =>
            import('./solicitudes/solicitudes').then(m => m.Solicitudes),
        canActivate: [authGuard]
    }



];
