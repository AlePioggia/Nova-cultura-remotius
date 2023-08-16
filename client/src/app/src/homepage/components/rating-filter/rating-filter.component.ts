import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
})
export class RatingFilterComponent {
  @Output() onFilter = new EventEmitter<number>();

  filterCards(event: any) {
    this.onFilter.emit(+event.target.value || null);
  }
}
