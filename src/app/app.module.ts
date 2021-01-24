import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './_services/in-memory-data.service';
import { JwtInterceptor } from '../app/_helpers/jwt.interceptor';
import {  ErrorInterceptor } from '../app/_helpers/error.interceptor';
import { fakeBackendProvider } from '../app/_helpers/fake-backend.interceptor';
import { HomeComponent } from './home/home/home.component';
import { AlertComponent } from './_components/alert/alert.component';
import { HighlightDirective } from './_shared/highlight.directive';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    HighlightDirective
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
