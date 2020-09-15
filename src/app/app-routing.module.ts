import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './CoreModule/dashboard/dashboard.component';
import { EmployeesComponent } from './CoreModule/employees/employees.component';
import { ProjectsComponent } from './CoreModule/projects/projects.component';
import { EmployeeCreateComponent } from './CoreModule/employee-create/employee-create.component';
import { ProjectCreateComponent } from './CoreModule/project-create/project-create.component';
import { LogsComponent } from './CoreModule/logs/logs.component';
import { LogsCreateComponent } from './CoreModule/logs-create/logs-create.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee-add', component: EmployeeCreateComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project-add', component: ProjectCreateComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'log-add', component: LogsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
