import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpBackend } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServersService } from './servers.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
