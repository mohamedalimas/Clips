import { Component , Input , OnInit , OnDestroy , ElementRef} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId:string= ''

  constructor(
    public modal : ModalService ,
    //  private el : ElementRef
     ){
  }
  ngOnInit(): void {
    this.modal.regsiterModal(this.modalId)
    // document.body.appendChild(this.el.nativeElement)
  }
  ngOnDestroy(): void {
    this.modal.unRegsiterModal(this.modalId);
    // document.body.removeChild(this.el.nativeElement)
  }
  closeModal(){
    this.modal.toggleModal(this.modalId)
  }
}
