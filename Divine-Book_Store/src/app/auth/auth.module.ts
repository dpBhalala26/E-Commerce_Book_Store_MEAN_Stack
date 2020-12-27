import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DpNgMaterialModule } from '../shared/ng-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserProfileComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    DpNgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
