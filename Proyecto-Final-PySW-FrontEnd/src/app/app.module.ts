import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDataTableModule} from "angular-9-datatable";
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';

//import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/login/token-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/home/coach/register/payment/payment.component';
import { AssistanceComponent } from './components/home/coach/register/assistance/assistance.component';
import { StudentComponent } from './components/home/coach/register/student/student.component';
import { StudentAssistenceComponent } from './components/home/student/student-assistence/student-assistence.component';
import { StudentRoutineComponent } from './components/home/student/student-routine/student-routine.component';
import { StudentPaymentComponent } from './components/home/student/student-payment/student-payment.component';
import { LoginService } from './services/login/login.service';
import { LoginComponent } from './components/home/login/login.component';
import { UserComponent } from './components/home/coach/generate/user/user.component';
import { HomeComponent } from './components/home/home/home.component';
import { StudentHomeComponent } from './components/home/student/student-home/student-home.component';
import { StatisticComponent } from './components/home/coach/statistic/statistic.component';

import { ArrangementComponent } from './components/home/coach/generate/arrangement/arrangement/arrangement.component';
import { FormArrangementComponent } from './components/home/coach/generate/arrangement/form-arrangement/form-arrangement.component';
import { DayRoutineComponent } from './components/home/coach/generate/day-routine/day-routine/day-routine.component';
import { FormDayRoutineComponent } from './components/home/coach/generate/day-routine/form-day-routine/form-day-routine.component';
import { TrainingComponent } from './components/home/coach/generate/training/training/training.component';
import { FormTrainingComponent } from './components/home/coach/generate/training/form-training/form-training.component';
import { RoutineComponent } from './components/home/coach/generate/routine/routine/routine.component';
import { FormRoutineComponent } from './components/home/coach/generate/routine/form-routine/form-routine.component';
import { CoachComponent } from './components/home/coach/register/coach/coach/coach.component';
import { FormCoachComponent } from './components/home/coach/register/coach/form-coach/form-coach.component';
import { NgxBarcodeModule } from 'ngx-barcode';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StudentHomeComponent,
    PaymentComponent,
    AssistanceComponent,
    StudentComponent,
    UserComponent,
    StudentAssistenceComponent,
    StudentRoutineComponent,
    StudentPaymentComponent,
    LoginComponent,
    HomeComponent,
    StatisticComponent,
    ArrangementComponent,
    FormArrangementComponent,
    TrainingComponent,
    FormTrainingComponent,
    DayRoutineComponent,
    FormDayRoutineComponent,
    RoutineComponent,
    FormRoutineComponent,
    CoachComponent,
    FormCoachComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxDataTableModule,
    AlifeFileToBase64Module,
    CommonModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    ChartsModule,
    NgxBarcodeModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar : true,
      progressAnimation : 'decreasing'
    }),
  ],
  providers: [
    LoginService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
