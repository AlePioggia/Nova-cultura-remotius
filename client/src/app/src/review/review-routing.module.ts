import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from 'src/app/authorization.guard';
import { InsertPopupComponent } from './components/insert-popup/insert-popup.component';
import { ReviewListComponent } from './components/review-list/review-list.component';

const routes: Routes = [
  {
    path: 'insert',
    component: InsertPopupComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'show',
    component: ReviewListComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
