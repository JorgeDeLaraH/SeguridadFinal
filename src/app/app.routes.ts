import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path:'principal', component:PrincipalComponent},
    {path: '**', redirectTo:'login'}
];
