import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventdefault]'
})
export class PreventdefaultDirective {

  constructor() { }
@HostListener('drop',['$event'])
@HostListener('dragover',['$event'])
handelevent(e : Event){
  e.preventDefault();
}
}
