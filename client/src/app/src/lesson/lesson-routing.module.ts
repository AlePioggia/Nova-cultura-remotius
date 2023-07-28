import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonModule } from './lesson.module';
import { LessonComponent } from './components/lesson/lesson.component';
import { AuthorizationGuard } from 'src/app/authorization.guard';

const routes: Routes = [
  { path: '', component: LessonComponent, canActivate: [AuthorizationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {}
