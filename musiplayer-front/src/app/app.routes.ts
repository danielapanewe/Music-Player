import { Routes } from '@angular/router';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { AlbumListComponent } from './components/album-list/album-list.component';

export const routes: Routes = [
    { path: '', component: AlbumListComponent }, // page d'accueil qui affiche les albums
    { path: 'album/:id', component: AlbumDetailComponent }, // détail d’un album
  ];