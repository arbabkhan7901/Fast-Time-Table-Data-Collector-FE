import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DefaultHeaderComponent } from './components/default-header/default-header.component';
import { DefaultFooterComponent } from './components/default-footer/default-footer.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  WidgetModule,
  TableModule
} from '@coreui/angular';
import { WidgetBrandComponent } from './components/widget-brand/widget-brand.component';
import { WidgetInfoComponent } from './components/widget-info/widget-info.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    DefaultHeaderComponent,
    DefaultFooterComponent,
    AddRoomComponent,
    WidgetBrandComponent,
    WidgetInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    GridModule,
    FormModule,
    SidebarModule, 
    NavModule, 
    DropdownModule, 
    AvatarModule,
    HeaderModule,
    PerfectScrollbarModule,
    IconModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    FooterModule,
    ListGroupModule,
    ProgressModule,
    SharedModule,
    TabsModule,
    UtilitiesModule,
    WidgetModule,
    ChartjsModule,
    HttpClientModule,
    TableModule,
    FormsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
