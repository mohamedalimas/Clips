import { Component, Input  , Output , EventEmitter} from '@angular/core';
import IClip from 'src/app/Models/clip.model';
import { CurdclipService } from 'src/app/services/curdclip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modifyclip',
  templateUrl: './modifyclip.component.html',
  styleUrls: ['./modifyclip.component.css']
})
export class ModifyclipComponent {
  @Input()
  clip : IClip|null=null
  @Output()
  deletedClip : EventEmitter<string> = new EventEmitter
  @Output()
  currentClipId : EventEmitter<IClip> = new EventEmitter
  constructor(
    private curdClip:CurdclipService,
    private modal:ModalService
  ){

  }
  
  deletClip(e: Event){
    e.preventDefault()
    this.curdClip.deleteClip(this.clip)
    this.deletedClip.emit(this.clip?.clipid)
  }
  editClip(e: Event){
    e.preventDefault()
    this.currentClipId.emit(this.clip as IClip)
    this.modal.toggleModal('editClip')
  }

  async copyToClipboard(e : Event , clipId : string|undefined){
    e.preventDefault()
    if(!clipId) return
    const url = `${location.origin}/clip/${clipId}`
    await navigator.clipboard.writeText(url) 
    alert('Link Copied')
  }
}
