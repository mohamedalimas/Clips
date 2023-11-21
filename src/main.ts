import {enableProdMode} from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

if (environment.production){
  enableProdMode()
}

firebase.initializeApp(environment.firebase);

let angularInit = false ;

firebase.auth().onAuthStateChanged(()=>{
  if (!angularInit){
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  }
  angularInit = true ;
}
)


