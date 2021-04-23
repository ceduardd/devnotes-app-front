import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './auth/guards/validate-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
    canLoad: [ValidateTokenGuard],
    canActivate: [ValidateTokenGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./notes/notes.module').then((m) => m.NotesModule),
    canLoad: [ValidateTokenGuard],
    canActivate: [ValidateTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
