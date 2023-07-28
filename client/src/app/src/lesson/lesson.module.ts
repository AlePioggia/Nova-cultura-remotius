import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './components/lesson/lesson.component';
import {
  DxButtonModule,
  DxFormModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxoValidationModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [LessonComponent],
  imports: [
    CommonModule,
    LessonRoutingModule,
    DxFormModule,
    DxoValidationModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxButtonModule,
  ],
  exports: [LessonComponent],
})
export class LessonModule {}
