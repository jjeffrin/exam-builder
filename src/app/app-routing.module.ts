import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateComponent } from './components/associate/associate.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ViewboardComponent } from './components/viewboard/viewboard.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: ''
  },
  {
    component: ViewboardComponent,
    path: 'dashboard',
    children: [
      {
        component: DashboardComponent,
        path: ''
      },
      {
        component: CreateUserComponent,
        path: 'create-user'
      },
      {
        component: CreateExamComponent,
        path: 'create-exam'
      },
      {
        component: AssociateComponent,
        path: 'associate'
      },
      {
        component: CreateQuestionComponent,
        path: 'create-question'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
