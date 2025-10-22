import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LayoutModule } from './layout/layout-module';
import { SharedModule } from './shared/shared-module';
import { Login } from './features/login/login';
import { Register } from './features/register/register';

@NgModule({
  declarations: [App, Login, Register],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, SharedModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}
