import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { ArchivePageComponent } from './pages/archive-page/archive-page.component';
import { TrashPageComponent } from './pages/trash-page/trash-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: NotesPageComponent,
      },
      {
        path: 'archive',
        component: ArchivePageComponent,
      },
      {
        path: 'trash',
        component: TrashPageComponent,
      },
      {
        path: 'edit',
        component: EditorPageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
