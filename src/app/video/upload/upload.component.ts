import { Component, OnDestroy } from '@angular/core';
import { CurdclipService } from '../../services/curdclip.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap, of, combineLatest, forkJoin } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { FfmpegService } from 'src/app/services/ffmpeg.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  fileDropped = false
  file: File | null = null
  applyHover = false
  fileName = ''
  filePath = ''
  fileRef?: AngularFireStorageReference
  isUploading = false
  uploadPersentage = 0
  showAlert = false
  alertColor = 'blue'
  alertMessage = ''
  uploadTask?: AngularFireUploadTask
  user: firebase.User | null = null
  ssURLs: string[] = []
  isSSLoading = false
  selectedSS = ''
  selectedSSBlob: Blob | null = null
  ssPath = ''
  ssRef?: AngularFireStorageReference
  uploadSSTask?: AngularFireUploadTask



  clipTitle = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    nonNullable: true
  })
  uploadForm = new FormGroup({
    clipTitle: this.clipTitle
  })

  constructor(
    private storage: AngularFireStorage,
    private curdclip: CurdclipService,
    private auth: AngularFireAuth,
    private router: Router,
    public ffmpeg: FfmpegService
  ) {
    this.auth.user.subscribe((user) => this.user = user)
    this.ffmpeg.init()
  }

  ngOnDestroy(): void {
    this.uploadTask?.cancel
    this.uploadSSTask?.cancel
  }

  async takefile(e: Event) {
    this.applyHover = false
    this.file = (e as DragEvent).dataTransfer ?
      (e as DragEvent).dataTransfer?.files.item(0) ?? null :
      (e.target as HTMLInputElement).files?.item(0) ?? null
    if (!this.file || this.file.type !== 'video/mp4') return
    this.isSSLoading = true
    this.fileDropped = true
    this.fileName = uuid()
    this.ssURLs = await this.ffmpeg.getSs(this.file , this.fileName)
    this.selectedSS = this.ssURLs[1]
    this.isSSLoading = false
  }

  async uploadclip() {
    this.isUploading = true
    this.uploadForm.disable()
    this.alertColor = 'blue'
    this.alertMessage = 'Please wait your clip is being uploaded...'
    this.showAlert = true
    this.filePath = `clips/${this.fileName}.mp4`
    this.ssPath = `screenshots/${this.fileName}.png`
    this.fileRef = this.storage.ref(this.filePath)
    this.ssRef = this.storage.ref(this.ssPath)
    this.selectedSSBlob = await this.ffmpeg.getBlobFromURL(this.selectedSS)
    this.uploadTask = this.storage.upload(this.filePath, this.file)
    this.uploadSSTask = this.storage.upload(this.ssPath, this.selectedSSBlob)
    combineLatest([this.uploadTask.percentageChanges(), this.uploadSSTask.percentageChanges()])
      .subscribe((persentages) => this.uploadPersentage = ((persentages[0] as number) + (persentages[1] as number)) / 200)
    forkJoin([this.uploadTask.snapshotChanges(), this.uploadSSTask.snapshotChanges()]).pipe(
      switchMap(() => forkJoin([this.fileRef?.getDownloadURL() ?? of(''), this.ssRef?.getDownloadURL() ?? of('')]) ?? of(''))
    ).subscribe({
      next: async (urls) => {
        if (!this.user) { throw new Error('Unauthed') }
        const docRef = await this.curdclip.creatClip({
          uid: this.user.uid,
          userName: this.user.displayName,
          clipTitle: this.clipTitle.value,
          fileName: this.fileName,
          url: urls[0],
          imgUrl: urls[1],
          timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        this.alertColor = 'green'
        this.alertMessage = 'your clip was uploaded Succesfully'

        setTimeout(() => this.router.navigate(['clip', docRef.id])
          , 1000)
      },
      error: (error) => {
        console.error(error)
        this.alertColor = 'red'
        this.alertMessage = 'An unexpected error occurred'
        this.isUploading = false
        this.uploadForm.enable()
      }
    })
  }

  selectImage(imgUrl: string) {
    this.selectedSS = imgUrl
  }
}
