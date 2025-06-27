
import { Component, EventEmitter, Output } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.css'
})
export class AlbumFormComponent {
  @Output() close = new EventEmitter<void>();
  album = {
    name: '',
    desc: '',
    bgColour: '#ffffff'
  };
  selectedFile: File | null = null;

  constructor(private albumService: AlbumService) {}
  closeModal() {
    this.close.emit();
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.album.name);
    formData.append('desc', this.album.desc);
    formData.append('bgColour', this.album.bgColour);
    formData.append('image', this.selectedFile); // 'image' correspond au champ attendu par multer: `req.file`

    this.albumService.createAlbum(formData).subscribe({
      next: res => {
        console.log('✅ Album créé avec succès', res);
        this.close.emit();
      },
        
      error: err => console.error('❌ Erreur lors de la création', err)
    });
  }
}