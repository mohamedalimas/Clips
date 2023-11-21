import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/Models/clip.model';
import { CurdclipService } from 'src/app/services/curdclip.service';

@Component({
  selector: 'app-editclip',
  templateUrl: './editclip.component.html',
  styleUrls: ['./editclip.component.css']
})
export class EditclipComponent implements OnChanges {

  @Input()
  clip: IClip | null = null
  @Output()
  editedClip: EventEmitter<IClip> = new EventEmitter()
  clipTitle = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    nonNullable: true
  })

  editClipForm = new FormGroup({ clipTitle: this.clipTitle })

  showAlert = false
  alertMessage = ''
  alertColor = 'blue'
  isUpdating = false
  constructor(
    private curdClip: CurdclipService
  ) {

  }

  ngOnChanges(): void {
    this.clipTitle.setValue(this.clip?.clipTitle as string)
    this.showAlert = false
  }

  async updateClip() {
    this.isUpdating = true
    this.alertColor = 'blue'
    this.alertMessage = 'Updating Clip ...'
    this.showAlert = true
    try {
      await this.curdClip.updateClip(this.clip, { clipTitle: this.clipTitle.value })
    }
    catch (e) {
      console.error(e)
      this.isUpdating = false
      this.alertColor = 'red'
      this.alertMessage = 'Unexpected Error Occurred Please Try Again Later!'
    }
    this.isUpdating = false
    this.alertColor = 'green'
    this.alertMessage = 'Clip updated succesfully'
    if (this.clip) {
      this.clip.clipTitle = this.clipTitle.value
      this.editedClip.emit(this.clip)
    }
  }
}
