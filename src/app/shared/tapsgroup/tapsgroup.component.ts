import { Component , ContentChildren ,QueryList , AfterContentInit} from '@angular/core';
import { TapComponent } from '../tap/tap.component';

@Component({
  selector: 'app-tapsgroup',
  templateUrl: './tapsgroup.component.html',
  styleUrls: ['./tapsgroup.component.css']
})
export class TapsgroupComponent implements AfterContentInit {
  @ContentChildren(TapComponent) taps :QueryList<TapComponent> = new QueryList<TapComponent>();
  ngAfterContentInit(): void {
    let activeTaps = this.taps.filter(tap=>tap.active)
    if(activeTaps.length===0){
      this.selectTap(this.taps.first)
    }
  }
  selectTap(tap :TapComponent){
    this.taps.forEach(t=>t.active=false)
    tap.active=true;
    
    return false;
  }
}
