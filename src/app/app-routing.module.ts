import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'characters-list', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./pages/episodes/episodes.module').then((m) => m.EpisodesModule),
  },

  {
    path: 'characters-list',
    loadChildren: () =>
      import('./pages/characters/characters-list/characters-list.module').then(
        (m) => m.CharactersListModule
      ),
  },
  {
    path: 'character-details/:id',
    loadChildren: () =>
      import(
        './pages/characters/characters-details/characters-details.module'
      ).then((m) => m.CharactersDetailsModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/notFound/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
