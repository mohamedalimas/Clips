import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CurdclipService } from 'src/app/services/curdclip.service';
import  IClip  from 'src/app/Models/clip.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  clips : IClip[] = []
  activeClip : IClip | null = null
  sorting = '1'
  sorting$ = new BehaviorSubject<string>('1')
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private curdclip : CurdclipService
  ) {
    this.route.queryParamMap.pipe(
      map((Params: Params) => Params['params'].sort)
    )
      .subscribe((sort) => {
        this.sorting = sort === '2' ? '2' : '1'
        this.sorting$.next(sort)
      })
  }

  ngOnInit(): void {
    this.curdclip.getClipsForUser(this.sorting$).subscribe((docs)=>{
      this.clips=[]
      docs.forEach((doc)=>this.clips.push({
        clipid:doc.id,
        ...doc.data()
      }))
    })
  }

  changeOreder(e: Event) {
    const { value } = e.target as HTMLSelectElement
    this.router.navigateByUrl(`/manage?sort=${value}`)
  }

  deleteClipFromPage(clipid : string){
    this.clips = this.clips.filter(clip=>clip.clipid!==clipid)
  }

  selectActiveClip(clip : IClip){
    this.activeClip=clip
  }

  updateClips(newclip : IClip){
    this.clips.forEach(clip=>{
      if (clip.clipid===newclip.clipid) clip=newclip
    })
  }
}
