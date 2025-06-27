// src/app/services/song.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Howl, Howler} from 'howler';

@Injectable({ providedIn: 'root' })
export class SongService {
  private apiUrl = 'http://localhost:3000/api/song';
  private sound?: Howl;

  constructor(private http: HttpClient) {}

  addSong(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  listSongs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  deleteSong(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${id}`);
  }


  play(url: string) {
    if (this.sound) {
      this.sound.stop();
    }

    this.sound = new Howl({
      src: [url],
      html5: true,
    });

    this.sound.play();
  }

  pause() {
    this.sound?.pause();
  }

  stop() {
    this.sound?.stop();
  }

  isPlaying(): boolean {
    return this.sound?.playing() ?? false;
  }

}
