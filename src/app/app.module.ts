import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ClipComponent } from './clip/clip.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ClipslistComponent } from './clipslist/clipslist.component';
import { VideoModule } from './video/video.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    ClipComponent,
    ClipslistComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    VideoModule,
    AppRoutingModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
