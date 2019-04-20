import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/wiki-links/home/home.component';
import { PageComponent } from './components/wiki-links/page/page.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserService } from './client_services/user.service';
import { SharedService } from './client_services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
