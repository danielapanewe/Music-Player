
import { Component, OnInit } from '@angular/core';
import { AlbumService, Album } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { AlbumFormComponent } from "../album-form/album-form.component";
import { AlbumDetailComponent } from "../album-detail/album-detail.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-album-list',
  imports: [CommonModule, AlbumFormComponent, AlbumDetailComponent, HeaderComponent],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [];
  showAddAlbumModal = false;
  selectedAlbumId: string | null = null;

  constructor(private albumService: AlbumService,private router: Router) {}

  ngOnInit(): void {
    this.loadAlbums();
  }
  loadAlbums(): void {
    this.albumService.getAlbums().subscribe((res) => {
      if (res.success) {
        this.albums = res.albums;
      }
    });
  }
  deleteAlbum(id: string) {
    this.albumService.deleteAlbum(id).subscribe(() => {
      this.albums = this.albums.filter(a => a._id !== id);
    });
  }

  openAlbumModal() {
    this.showAddAlbumModal = true;
   
  }

  closeAlbumModal() {
    this.showAddAlbumModal = false;
    this.loadAlbums();
 
  }

  selectAlbum(albumId?: string) :void{
    this.router.navigate(['/album', albumId]);
  }

  closeDetail() {
    this.selectedAlbumId = null;
  }
}