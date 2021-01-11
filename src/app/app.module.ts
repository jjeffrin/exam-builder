import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewboardComponent } from './components/viewboard/viewboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { AssociateComponent } from './components/associate/associate.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionService } from './services/question.service';
import { ExamService } from './services/exam.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    ViewboardComponent,
    CreateUserComponent,
    CreateExamComponent,
    AssociateComponent,
    CreateQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    QuestionService,
    ExamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
