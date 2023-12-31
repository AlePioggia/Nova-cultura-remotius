import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './components/lesson/lesson.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSchedulerModule,
  DxSwitchModule,
  DxTemplateModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  DxiViewModule,
  DxoTextsModule,
  DxoToolbarModule,
  DxoValidationModule,
} from 'devextreme-angular/ui/nested';
import { LessonPlannerComponent } from './components/lesson-planner/lesson-planner.component';
import { LessonGridComponent } from './components/lesson/data-grid/lesson-grid/lesson-grid.component';
import { TeacherPlannerComponent } from './components/teacher-planner/teacher-planner.component';
import { MyLessonsPlannerComponent } from './components/my-lessons-planner/my-lessons-planner.component';

@NgModule({
  declarations: [
    LessonComponent,
    LessonPlannerComponent,
    LessonGridComponent,
    TeacherPlannerComponent,
    MyLessonsPlannerComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    DxFormModule,
    DxoValidationModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxButtonModule,
    DxSchedulerModule,
    DxiViewModule,
    DxTemplateModule,
    DxDataGridModule,
    DxoTextsModule,
    DxSwitchModule,
    DxoToolbarModule,
  ],
  exports: [LessonComponent],
})
export class LessonModule {}
