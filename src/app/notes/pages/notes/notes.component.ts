import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotesService } from '../../services/notes.service';
import { Note, NoteStatus } from '../../interfaces/notes.interfaces';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes.component.html',
  providers: [MessageService],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  selectedNoteId!: number;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private notesServices: NotesService
  ) {}

  get user() {
    return this.authService.user;
  }

  ngOnInit(): void {
    this.notesServices.getAllNotes().subscribe((notes) => {
      this.notes = this.filterActiveNotes(notes);
    });
  }

  filterActiveNotes(notes: Note[]) {
    return notes.filter((note) => note.status === NoteStatus.active);
  }

  changeNoteStatus(status: NoteStatus) {
    this.notes = this.notes.map((note) =>
      note.id !== this.selectedNoteId ? { ...note } : { ...note, status }
    );

    this.notes = this.filterActiveNotes(this.notes);
  }

  showConfirm(key: string, noteId: number) {
    this.messageService.clear();
    this.messageService.add({
      key,
      summary: `¿Desea ${
        key === 'deleteToast' ? 'eliminar' : 'archivar'
      } esta nota?`,
      sticky: true,
      severity: 'warn',
      detail: 'Confirmar para proceder',
    });

    this.selectedNoteId = noteId;
  }

  onConfirmArchive() {
    this.messageService.clear();

    this.notesServices
      .changeNoteStatus(this.selectedNoteId, NoteStatus.archived)
      .subscribe();

    this.changeNoteStatus(NoteStatus.archived);
  }

  onConfirmDelete() {
    this.messageService.clear();

    this.notesServices
      .changeNoteStatus(this.selectedNoteId, NoteStatus.trashed)
      .subscribe();

    this.changeNoteStatus(NoteStatus.trashed);
  }

  onReject() {
    this.messageService.clear();
  }
}
