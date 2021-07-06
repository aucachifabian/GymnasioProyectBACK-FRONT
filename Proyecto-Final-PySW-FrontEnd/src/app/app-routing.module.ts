import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrangementComponent } from './components/home/coach/generate/arrangement/arrangement/arrangement.component';
import { FormArrangementComponent } from './components/home/coach/generate/arrangement/form-arrangement/form-arrangement.component';
import { DayRoutineComponent } from './components/home/coach/generate/day-routine/day-routine/day-routine.component';
import { FormDayRoutineComponent } from './components/home/coach/generate/day-routine/form-day-routine/form-day-routine.component';
import { FormRoutineComponent } from './components/home/coach/generate/routine/form-routine/form-routine.component';
import { RoutineComponent } from './components/home/coach/generate/routine/routine/routine.component';
import { FormTrainingComponent } from './components/home/coach/generate/training/form-training/form-training.component';
import { TrainingComponent } from './components/home/coach/generate/training/training/training.component';
import { UserComponent } from './components/home/coach/generate/user/user.component';
import { AssistanceComponent } from './components/home/coach/register/assistance/assistance.component';
import { CoachComponent } from './components/home/coach/register/coach/coach/coach.component';
import { FormCoachComponent } from './components/home/coach/register/coach/form-coach/form-coach.component';
import { PaymentComponent } from './components/home/coach/register/payment/payment.component';
import { StudentComponent } from './components/home/coach/register/student/student.component';
import { StatisticComponent } from './components/home/coach/statistic/statistic.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { StudentAssistenceComponent } from './components/home/student/student-assistence/student-assistence.component';
import { StudentHomeComponent } from './components/home/student/student-home/student-home.component';
import { StudentPaymentComponent } from './components/home/student/student-payment/student-payment.component';
import { StudentRoutineComponent } from './components/home/student/student-routine/student-routine.component';


const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'login', component : LoginComponent },
  { path: 'payment', component : PaymentComponent },
  { path: 'user', component : UserComponent },
  { path: 'student', component : StudentComponent },
  { path: 'assitance', component : AssistanceComponent },
  { path: 'statistic', component : StatisticComponent },
  { path: 'coach', component : CoachComponent },
  { path: 'coach/form/:id', component : FormCoachComponent },
  { path: 'routine', component : RoutineComponent },
  { path: 'routine/form/:id', component : FormRoutineComponent },
  { path: 'arrangement', component : ArrangementComponent },
  { path: 'arrangement/form/:id', component : FormArrangementComponent },
  { path: 'training', component : TrainingComponent },
  { path: 'training/form/:id', component : FormTrainingComponent },
  { path: 'dayRoutine', component : DayRoutineComponent },
  { path: 'dayRoutine/form/:id', component : FormDayRoutineComponent },
  { path: 'student/home', component : StudentHomeComponent },
  { path: 'student/assistance/:id', component : StudentAssistenceComponent },
  { path: 'student/payment/:id', component : StudentPaymentComponent },
  { path: 'student/routine/:id', component : StudentRoutineComponent },
  { path: '**', redirectTo: '/' }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
