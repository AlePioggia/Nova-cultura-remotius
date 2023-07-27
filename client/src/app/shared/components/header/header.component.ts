import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DxButtonModule, DxToolbarModule } from "devextreme-angular";
import { UserPanelModule } from "../user-panel/user-panel.component";
import { AuthenticationService } from "src/app/src/login/services/authentication.service";

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
      this.router.navigate(['/bio']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authenticationService.logOut();
    }
  },

  ];

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

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