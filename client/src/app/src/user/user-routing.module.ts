import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AuthorizationGuard } from 'src/app/authorization.guard';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthorizationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
