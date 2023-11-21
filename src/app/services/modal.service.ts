import { Injectable } from '@angular/core';
interface Imodal {
  id:string;
  visible:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals :Imodal[]=[]
  visible: any;
  constructor() { }

  regsiterModal(id:string){
    this.modals.push({
      id: id,
      visible: false
    })
  } 

  unRegsiterModal(id:string){
    this.modals=this.modals.filter(e=>e.id!=id)
  } 

  isModalOpen(id:string) : boolean{
    return !!this.modals.find(e=>e.id==id)?.visible;
  }

  toggleModal(id:string){
    let modal = this.modals.find(e=>e.id==id);
    if(modal){
      modal.visible=!modal.visible
    }
  }
}
