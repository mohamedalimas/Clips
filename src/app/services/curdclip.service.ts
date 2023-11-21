import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IClip from '../Models/clip.model';
import { switchMap, map, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CurdclipService implements Resolve<IClip|null> {
  private collection: AngularFirestoreCollection<IClip>
  clips: IClip[] = []
  lastDoc?: firebase.firestore.DocumentSnapshot<IClip>
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.collection = this.db.collection('Clips')
  }
  resolve=(route : ActivatedRouteSnapshot , state : RouterStateSnapshot)=>{
    return this.collection.doc(route.params['id']).get().pipe(
      map((snapshot)=>{
        const data = snapshot.data()
        if(!data){
          return null
        }
        return data as IClip
      })
    )
  }
  creatClip(clip: IClip) {
    return this.collection.add(clip)
  }

  getClipsForUser(sorting: BehaviorSubject<string>) {
    return combineLatest([sorting, this.auth.user]).pipe(
      switchMap((values) => {
        const [sorting, user] = values
        const direction = sorting === '2' ? 'desc' : 'asc'
        const query = this.collection.ref.where('uid', '==', user?.uid).orderBy('timeStamp', direction)
        return query.get()
      }),
      map((querysnapshot: QuerySnapshot<IClip>) => querysnapshot.docs)
    )
  }

  deleteClip(clip: IClip | null) {
    if (!clip) return
    this.storage.ref(`clips/${clip.fileName}.mp4`).delete()
    this.storage.ref(`screenshots/${clip.fileName}.png`).delete()
    this.collection.doc(clip.clipid).delete()
  }

  updateClip(clip: IClip | null, newclip: {}) {
    if (!clip) return
    return this.collection.doc(clip.clipid).update(newclip)
  }

  async getClips() {
    let query = this.collection.ref.orderBy('timeStamp', 'desc')
    if (this.clips.length) {
      this.collection.doc(this.clips[this.clips.length - 1].clipid).get().subscribe(async(docSnapshot) => {
        this.lastDoc = docSnapshot
        query = query.startAfter(this.lastDoc).limit(6)
        const querySnapshot = await query.get()
        querySnapshot.docs.forEach((doc) => {
          this.clips.push({
            ...doc.data(),
            clipid: doc.id,
          })
        })
      }
      )
    }
    else {
      query = query.limit(6)
      const querySnapshot = await query.get()
      querySnapshot.docs.forEach((doc) => {
        this.clips.push({
          ...doc.data(),
          clipid: doc.id,
        })
      })
    }
  }
}
