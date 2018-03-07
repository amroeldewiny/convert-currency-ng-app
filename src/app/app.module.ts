import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth-service/auth.service';
import { CurrencyService } from './services/currency-service/currency.service';


import { AppComponent } from './app.component';
import { ConvertComponent } from './convert/convert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes =
  [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'register',
      component: RegisterComponent
    }, {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'convert',
      component: ConvertComponent
    }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    ConvertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [AuthService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
