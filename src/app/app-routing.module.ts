import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    path: '', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path:'register', component: RegisterComponent
  },

  {
    path: 'login', component: LoginComponent
  },
  // {
  //   path:'Qrcode', component: QrcodeComponent
  // },
  {
    path:'admin', component: AdminComponent
  },


  {
    path: '**', component: ErrorComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
