import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BreadcumbComponent } from './components/breadcumb/breadcumb.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [HomeComponent, TopbarComponent, SidebarComponent, BreadcumbComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    TranslocoModule,
    SharedModule
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: {scope: 'home', alias: 'HOME'} }
  ]
})
export class HomeModule { }
