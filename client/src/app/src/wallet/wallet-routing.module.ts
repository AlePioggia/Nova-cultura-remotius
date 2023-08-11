import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import { AuthorizationGuard } from 'src/app/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: WalletFormComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {}
