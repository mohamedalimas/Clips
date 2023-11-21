import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PreventdefaultDirective } from '../shared/preventdefault.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModifyclipComponent } from './modifyclip/modifyclip.component';
import { EditclipComponent } from './editclip/editclip.component';




@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    NotfoundComponent,
    PreventdefaultDirective,
    ModifyclipComponent,
    EditclipComponent,
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class VideoModule { }
