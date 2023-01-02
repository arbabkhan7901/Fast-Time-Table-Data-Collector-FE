import { Component } from '@angular/core';
import { cilSpeedometer,  cilStar } from '@coreui/icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public icons = { cilSpeedometer,  cilStar };
  public addRoom = false;
  public showDashboard = true;
  
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}

  showRoom() {
    this.addRoom = true;
    this.showDashboard = false;
  }

  showDash() {
    this.addRoom = false;
    this.showDashboard = true;
  }
}
