import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  showSuccess(message: string): void {
    notify({
      message: message,
      type: 'success',
      displayTime: 3000,
    });
  }

  showError(message: string): void {
    notify({
      message: message,
      type: 'error',
      displayTime: 3000,
    });
  }
}
