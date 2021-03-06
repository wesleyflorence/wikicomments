import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/wiki-links/home/home.component';
import { PageComponent } from './components/wiki-links/page/page.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './client_services/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'page', component: PageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
