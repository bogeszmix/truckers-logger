import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {
  TRANSLOCO_CONFIG,
  TranslocoConfig,
  TranslocoModule
} from '@ngneat/transloco';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { httpLoader } from './translation/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AngularFirestore,
    httpLoader,
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
