import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AngularFireAuthGuard , redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authedonly: true,
      authGuardPipe: ()=> redirectUnauthorizedTo('/')
    },
    canActivate : [AngularFireAuthGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: {
      authedonly: true
    }
    ,
    canActivate : [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
