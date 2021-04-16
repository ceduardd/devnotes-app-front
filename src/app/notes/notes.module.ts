import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../primeng/primeng.module';

import { NotesRoutingModule } from './notes-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { ArchivePageComponent } from './pages/archive-page/archive-page.component';
import { TrashPageComponent } from './pages/trash-page/trash-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MenubarComponent,
    NotesPageComponent,
    SettingsPageComponent,
    EditorPageComponent,
    ArchivePageComponent,
    TrashPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotesRoutingModule,
    PrimengModule,
  ],
})
export class NotesModule {}
