import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './SharedModule/layout/layout.component';
import { EmployeesComponent } from './CoreModule/employees/employees.component';
import { ProjectsComponent } from './CoreModule/projects/projects.component';
import { DashboardComponent } from './CoreModule/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeCreateComponent } from './CoreModule/employee-create/employee-create.component';
import { ProjectCreateComponent } from './CoreModule/project-create/project-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogsComponent } from './CoreModule/logs/logs.component';
import { LogsCreateComponent } from './CoreModule/logs-create/logs-create.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    EmployeesComponent,
    ProjectsComponent,
    DashboardComponent,
    EmployeeCreateComponent,
    ProjectCreateComponent,
    LogsComponent,
    LogsCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
