import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal/modal.component';
import { TapsgroupComponent } from './tapsgroup/tapsgroup.component';
import { TapComponent } from './tap/tap.component';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import { PreventdefaultDirective } from './directives/preventdefault.directive';
import { SafeURLPipe } from '../shared/pipes/safe-url.pipe';
import { FormatDatePipe } from '../shared/pipes/format-date.pipe';
import { DatePipe } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    ModalComponent,
    TapsgroupComponent,
    TapComponent,
    InputComponent,
    AlertComponent,
    PreventdefaultDirective,
    SafeURLPipe,
    FormatDatePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective, 

  ],
  exports: [
    ModalComponent,
    TapsgroupComponent,
    TapComponent,
    InputComponent,
    AlertComponent,
    PreventdefaultDirective,
    FormatDatePipe,
    SafeURLPipe,
  ],
  providers : [
    DatePipe,
    provideNgxMask()
  ]
})
export class SharedModule { }
