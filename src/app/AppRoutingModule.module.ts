import {inject, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthService} from "./services/auth-service.service";

const authGuard = () => {
  const authService = inject(AuthService)
  if (authService.isUserAuthenticated()) {
    return true
  }

  return inject(Router).navigate(['/login'])
}
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'calculator',
    canActivate: [authGuard],
    loadChildren: () => import('./components/Components.module').then((m) => m.ComponentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
