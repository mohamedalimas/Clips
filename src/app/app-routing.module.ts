import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './video/notfound/notfound.component';
import { ClipComponent } from './clip/clip.component';
import { CurdclipService } from './services/curdclip.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path : 'clip/:id',
    component : ClipComponent,
    resolve : {
      clip : CurdclipService
    }
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path : '',
    loadChildren : async ()=> (await import('./video/video.module')).VideoModule
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
