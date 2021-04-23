import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArchiveComponent } from './pages/archive/archive.component';
import { EditorComponent } from './pages/editor/editor.component';
import { MainComponent } from './pages/main/main.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TrashComponent } from './pages/trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: NotesComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'trash',
        component: TrashComponent,
      },
      {
        path: 'edit',
        component: EditorComponent,
      },
      {
        path: 'edit/:id',
        component: EditorComponent,
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
