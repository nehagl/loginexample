import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './test-data';
import { ArticleComponent } from './article/article.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(TestData)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
