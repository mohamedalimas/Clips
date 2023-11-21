import { Component , ElementRef, OnInit , ViewChild , ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurdclipService } from '../services/curdclip.service';
import  videojs  from 'video.js';
import IClip from '../Models/clip.model';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class ClipComponent implements OnInit {
  clip: IClip|null = null
  @ViewChild('videoplayer' , {static : true}) target? : ElementRef
  player? : videojs.Player
  constructor(
    public route : ActivatedRoute,
    public clipcurd :CurdclipService
    ){}
  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)
    this.route.data.subscribe((data)=>{
      this.clip=data['clip']
      this.player?.src({
        src: this.clip?.url as string,
        type : 'video/mp4'
      })
    })
  }
}
