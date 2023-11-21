import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CurdclipService } from 'src/app/services/curdclip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clipslist',
  templateUrl: './clipslist.component.html',
  styleUrls: ['./clipslist.component.css']
})
export class ClipslistComponent implements OnInit, OnDestroy {
  @Input() scrollable = true
  constructor(
    public clipcurd: CurdclipService,
    private router :Router
  ) { }
  async ngOnInit() {
    await this.clipcurd.getClips()
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
  ngOnDestroy() {
    this.clipcurd.clips = []
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  async scroll(e : Event , clipId : string|undefined) {
    e.preventDefault()
    await this.router.navigate(['/','clip',clipId])
    document.getElementById('player')?.scrollIntoView({behavior: 'smooth'})
  }

  handleScroll = () => {
    const { innerHeight } = window
    const { scrollTop, offsetHeight } = document.documentElement
    const isDown = Math.round(scrollTop) + innerHeight === offsetHeight
    if (isDown) {
      this.clipcurd.getClips()
    }
  }
}
