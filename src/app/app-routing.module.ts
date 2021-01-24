import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role.enum';

const adminModule = () => import('./admin/modules/admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/modules/profile/profile.module').then(x => x.ProfileModule);
const accountModule = () => import('./account/modules/account/account.module').then(x => x.AccountModule);
const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
