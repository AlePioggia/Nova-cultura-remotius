import {
  Component,
  NgModule,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  DxTreeViewModule,
  DxTreeViewComponent,
} from 'devextreme-angular/ui/tree-view';
import { studentNavigation, teacherNavigation } from '../../../app-navigation';

import * as events from 'devextreme/events';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<string>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  _items: any[]; // Make _items a regular property
  // get items() {
  //   if (!this._items) {
  //     this._items = studentNavigation.map((item) => {
  //       if (item.path && !/^\//.test(item.path)) {
  //         item.path = `/${item.path}`;
  //       }
  //       return { ...item, expanded: !this._compactMode };
  //     });
  //   }

  //   return this._items;
  // }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(
    private elementRef: ElementRef,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.isPippo$.subscribe((isTeacher) => {
      const navigation = isTeacher ? teacherNavigation : studentNavigation;
      this._items = navigation.map((item) => {
        if (item.path && !/^\//.test(item.path)) {
          item.path = `/${item.path}`;
        }
        return { ...item, expanded: !this._compactMode };
      });
    });
  }

  onItemClick(event) {
    const selectedItem = event.itemData;
    if (selectedItem.path) {
      const navigationExtras = selectedItem.fromMenu
        ? { queryParams: { fromMenu: selectedItem.fromMenu } }
        : {};
      console.log(navigationExtras);
      this.router.navigate([selectedItem.path], {
        queryParams: { fromMenu: 'true' },
      });
    }
    this.selectedItemChanged.emit(event);
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [DxTreeViewModule],
  declarations: [SideNavigationMenuComponent],
  exports: [SideNavigationMenuComponent],
})
export class SideNavigationMenuModule {}
