import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() query = new EventEmitter<string>();

  onSearch(event: any) {
    const query = event.target.value;
    this.query.emit(query);
  }
}
