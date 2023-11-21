import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = false
  private ffmpeg
  ssCount = [1, 2, 3]
  commands: string[] = []
  constructor(

  ) {
    this.ffmpeg = createFFmpeg()
  }

  async init() {
    if (this.isReady) {
      return
    }

    await this.ffmpeg.load()
    this.isReady = true
  }

  async getSs(file: File , fileName : string) {
    const data = await fetchFile(file)
    this.ffmpeg.FS('writeFile', fileName, data)
    this.ssCount.forEach(num => {
      this.commands.push(
        '-i', fileName,
        '-ss', `00:00:0${num}`,
        '-frames:v', '1',
        '-filter:v', 'scale=510:-1',
        `${fileName}_0${num}.png`
      )
    });
    await this.ffmpeg.run(
      ...this.commands
    )
    const ssURLs : string[] = []
    this.ssCount.forEach(num => {
      const ssBlob = new Blob([this.ffmpeg.FS('readFile',`${fileName}_0${num}.png`).buffer],{type:'image/png'})
      const ssURL = URL.createObjectURL(ssBlob)
      ssURLs.push(ssURL)
    });
    return ssURLs 
  }

  async getBlobFromURL(url :string){
    const respnse = await fetch(url)
    return respnse.blob()
  }
}
