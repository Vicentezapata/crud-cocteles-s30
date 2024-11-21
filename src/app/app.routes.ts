import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'listar-cocteles',
    loadComponent: () => import('./pages/listar-cocteles/listar-cocteles.page').then( m => m.ListarCoctelesPage)
  },
  {
    path: 'agregar-cocteles',
    loadComponent: () => import('./pages/agregar-cocteles/agregar-cocteles.page').then( m => m.AgregarCoctelesPage)
  },
  {
    path: 'editar-cocteles',
    loadComponent: () => import('./pages/editar-cocteles/editar-cocteles.page').then( m => m.EditarCoctelesPage)
  },
  {
    path: 'detalles-cocteles',
    loadComponent: () => import('./pages/detalles-cocteles/detalles-cocteles.page').then( m => m.DetallesCoctelesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'random',
    loadComponent: () => import('./pages/random/random.page').then( m => m.RandomPage)
  },
];
