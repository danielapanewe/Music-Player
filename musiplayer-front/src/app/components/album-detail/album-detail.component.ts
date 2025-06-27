
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit {
  @Input() albumId!: string;
  @Output() close = new EventEmitter<void>();

  showAddForm = false;
  songs: any[] = [];
  name = '';
  desc = '';
  audio!: File;
  image!: File;
  showModal = false;

  sound?: Howl;
isPlaying = false;
progress = 0; // entre 0 et 1
progressInterval?: any;
/*newSong = {
  name: '',
  desc: '',
  imageFile: null
};*/

  constructor(private songService: SongService,private route: ActivatedRoute,
    private albumService: AlbumService) {}

    album: any;
  ngOnInit(): void {
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    this.fetchAlbum(); // pour image/infos
    this.fetchSongs(); // pour les sons
  }

  openModal() {
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.name='';
    this.desc='';
    this.image= new File([], '');
    //this.newSong = { name: '', desc: '', imageFile: null };
  }

/*  handleImageUpload(event: any) {
    this.newSong.imageFile = event.target.files[0];
  }*/
  
  /*submitSong() {
    const formData = new FormData();
    formData.append('name', this.newSong.name);
    formData.append('desc', this.newSong.desc);
    formData.append('album', this.album.name); // ou this.albumId selon backend
    formData.append('image', this.newSong.imageFile);
  
    this.songService.addSong(formData).subscribe(() => {
      this.fetchSongs();
      this.closeModal();
    });
  }*/
  deleteSong(songId: string) {
    if (confirm('Supprimer ce son ?')) {
      this.songService.deleteSong(songId).subscribe(() => {
        this.fetchSongs();
      });
    }
  }

  fetchAlbum() {
    this.albumService.getAlbumById(this.albumId).subscribe(res => {
      this.album = res.album;
    });
  }

  fetchSongs() {
    this.songService.listSongs().subscribe((res) => {
      this.songs = res.songs.filter((s: any) => s.album === this.albumId);
    });
  }

  onAudioChange(event: any) {
    this.audio = event.target.files[0];
  }

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addSong() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('desc', this.desc);
    formData.append('album', this.albumId);
    formData.append('audio', this.audio);
    formData.append('image', this.image);

    this.songService.addSong(formData).subscribe(() => {
      this.fetchSongs();
      this.name = '';
      this.desc = '';
      this.showAddForm = false;
      this.closeModal();
      console.log('le son a bien été ajouté')
    });
  }

  removeSong(id: string) {
    this.songService.deleteSong(id).subscribe(() => this.fetchSongs());
  }


  playSong(songUrl: string) {
    this.songService.play(songUrl);
  }

  pauseSong() {
    this.songService.pause();
  }

  stopSong() {
    this.songService.stop();
  }

  
}
