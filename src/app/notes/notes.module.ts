import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { NotesRoutingModule } from './notes-routing.module';
import { ArchiveComponent } from './pages/archive/archive.component';
import { EditorComponent } from './pages/editor/editor.component';
import { MainComponent } from './pages/main/main.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TrashComponent } from './pages/trash/trash.component';
import { FirstNamePipe } from './pipes/first-name.pipe';
import { MaxContentPipe } from './pipes/max-content.pipe';

@NgModule({
  declarations: [
    ArchiveComponent,
    EditorComponent,
    MainComponent,
    NotesComponent,
    TrashComponent,
    FirstNamePipe,
    MaxContentPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotesRoutingModule,
    PrimeNgModule,
    SharedModule,
  ],
})
export class NotesModule {}
