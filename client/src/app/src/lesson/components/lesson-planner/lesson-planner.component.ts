import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson-planner',
  templateUrl: './lesson-planner.component.html',
  styleUrls: ['./lesson-planner.component.css'],
})
export class LessonPlannerComponent {
  lessonsData: any[] = [
    {
      text: 'Lezione di Matematica',
      startDate: new Date(2023, 7, 4, 9, 30),
      endDate: new Date(2023, 7, 4, 11, 30),
    },
    {
      text: 'Lezione di Fisica',
      startDate: new Date(2023, 7, 5, 12, 0),
      endDate: new Date(2023, 7, 5, 14, 0),
    },
  ];
  currentDate: Date = new Date();

  onAppointmentClick(e) {
    if (confirm('Vuoi prenotare questa lezione?')) {
      console.log('Lezione prenotata:', e.appointmentData);
    }
  }
}
