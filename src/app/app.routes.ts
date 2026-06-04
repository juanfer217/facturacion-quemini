import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Historial } from './pages/historial/historial';
import { Ordenes } from './pages/ordenes/ordenes';

export const routes: Routes = [
    { path: '', component:Home },
    {path: 'historial', component: Historial},
    {path: 'ordenes', component: Ordenes},
    {path: '**', redirectTo: '' }
];
