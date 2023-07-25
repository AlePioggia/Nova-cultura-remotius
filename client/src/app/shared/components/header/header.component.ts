import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DxButtonModule, DxToolbarModule } from "devextreme-angular";
import { UserPanelModule } from "../user-panel/user-panel.component";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  user = { email: 'alexpioggia@gmail.com' };

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner'
  }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }