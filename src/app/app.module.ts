import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/app.interceptor';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBG3YReMMbQ9XhcsxJzNvTZwK3Qbn5pebE' + '&libraries=visualization'
   }),

     AppRoutingModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
