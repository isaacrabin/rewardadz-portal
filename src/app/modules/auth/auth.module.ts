import { AuthService } from 'src/app/core/services/auth.service';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { TwoStepsComponent } from './pages/two-steps/two-steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    TwoStepsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,

    AngularSvgIconModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,


  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers:[AuthService]
})
export class AuthModule {}
