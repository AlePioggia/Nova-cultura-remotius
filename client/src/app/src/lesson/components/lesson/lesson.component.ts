import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
})
export class LessonComponent {
  lesson: any = {
    name: '',
    start: '',
    end: '',
    description: '',
  };

  submitForm() {
    // Aggiungi qui la logica per inviare i dati del modulo
    console.log(this.lesson);
  }
}
