export interface ILessonRequest {
  startTime: Date;
  endTime: Date;
  subject: string;
  notes: string;
}

export class LessonRequest implements ILessonRequest {
  startTime: Date;
  endTime: Date;
  subject: string;
  notes: string;
}
