import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Album {
  _id?: string;
  name: string;
  desc: string;
  bgColour: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private baseUrl = 'http://localhost:3000/api/album';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<{ success: boolean; albums: Album[] }> {
    return this.http.get<{ success: boolean; albums: Album[] }>(`${this.baseUrl}/list`);
  }
  getAlbumById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${id}`);
  }

  createAlbum(formData: FormData) {
    return this.http.post(`${this.baseUrl}/add`, formData);
  }

  deleteAlbum(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${id}`);
  }
}
