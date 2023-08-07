import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonComponent } from './components/lesson/lesson.component';
import { AuthorizationGuard } from 'src/app/authorization.guard';
import { LessonPlannerComponent } from './components/lesson-planner/lesson-planner.component';
import { LessonGridComponent } from './components/lesson/data-grid/lesson-grid/lesson-grid.component';

const routes: Routes = [
  {
    path: 'new',
    component: LessonComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: '',
    component: LessonGridComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'planner',
    component: LessonPlannerComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {}
