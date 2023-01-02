import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { cilMenu } from '@coreui/icons';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {
  
  @Input() sidebarId: string = "sidebar";
  public icons = { cilMenu };

  constructor(private classToggler: ClassToggleService, private router: Router) {
    super();
  }
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
