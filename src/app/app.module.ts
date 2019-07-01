import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FigureFormComponent } from './figure-form/figure-form.component';
import { OneFigureFormComponent } from './one-figure-form/one-figure-form.component';
import { SaveFormComponent } from './save-form/save-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestComponent,
    FigureFormComponent,
    OneFigureFormComponent,
    SaveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
