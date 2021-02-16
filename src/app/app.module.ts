import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  TranslocoConfig,
  TranslocoModule, TRANSLOCO_CONFIG
} from '@ngneat/transloco';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpLoader } from './translation/http-loader';
import { customMissingHandler } from './translation/missing-translation.handler';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AngularFirestore,
    httpLoader,
    customMissingHandler,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'hu'],
        reRenderOnLangChange: true,
        fallbackLang: 'hu',
        defaultLang: 'hu'
      } as TranslocoConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
