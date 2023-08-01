import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthorizationGuard } from 'src/app/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
