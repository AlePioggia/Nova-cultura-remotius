export interface ILessonRequest {
  teacherMail: string;
  studentMail: string;
  startTime: Date;
  endTime: Date;
  subject: string;
  notes: string;
}

export class LessonRequest implements ILessonRequest {
  teacherMail: string;
  studentMail: string;
  startTime: Date;
  endTime: Date;
  subject: string;
  notes: string;
}

export interface ILessonSimpleRequest {
  startTime: Date;
  endTime: Date;
  subject: string;
  notes: string;
}

export class LessonSimpleRequest implements ILessonSimpleRequest {
  startTime: Date;
  endTime: Date;
  subject: string;
  notes: string;
}
