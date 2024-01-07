import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectPageComponent } from './pages/auth-redirect-page/auth-redirect-page.component';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { RuleSetterPageComponent } from './pages/rule-setter-page/rule-setter-page.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: 'auth-redirect', component: AuthRedirectPageComponent },
  { path: '', component: PageContainerComponent, canActivate: [authGuard], children: [
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'display', component: DisplayPageComponent },
    { path: 'rule-setter', component: RuleSetterPageComponent },
    { path: '**', redirectTo: '/dashboard' },
  ]},
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
