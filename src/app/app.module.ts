import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { AdminComponent } from './admin/admin.component';
// import{ToastrModule} from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoute: Routes = [

]

@NgModule({
  declarations: [
    AppComponent,

    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    QrcodeComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule
    // ToastrModule.forRoot(), // ToastrModule added
    // BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
