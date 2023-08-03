import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './components/lesson/lesson.component';
import {
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxSchedulerModule,
  DxTemplateModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  DxiViewModule,
  DxoValidationModule,
} from 'devextreme-angular/ui/nested';
import { LessonPlannerComponent } from './components/lesson-planner/lesson-planner.component';
import { PopupComponent } from './components/lesson-planner/popup/popup.component';

@NgModule({
  declarations: [LessonComponent, LessonPlannerComponent, PopupComponent],
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
  ],
  exports: [LessonComponent],
})
export class LessonModule {}