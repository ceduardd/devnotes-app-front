import { Component, OnInit } from '@angular/core';
import { Note, NoteStatus } from '../../interfaces/notes.interfaces';
import { MessageService } from 'primeng/api';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive.component.html',
  providers: [MessageService],
})
export class ArchiveComponent implements OnInit {
  notes: Note[] = [];
  selectedNoteId!: number;

  constructor(
    private messageService: MessageService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.notesService.getAllNotes().subscribe((notes) => {
      this.notes = notes.filter((note) => note.status === NoteStatus.archived);
    });
  }

  changeNoteState(noteUpdated: Note) {
    this.notes = this.notes.map((note) =>
      note.id !== noteUpdated.id ? { ...note } : { ...noteUpdated }
    );
    this.notes = this.notes.filter(
      (note) => note.status === NoteStatus.archived
    );
  }

  showConfirm(noteId: number) {
    this.messageService.clear();
    this.messageService.add({
      key: 'deleteToast',
      summary: '¿Desea eliminar esta nota?',
      sticky: true,
      severity: 'warn',
      detail: 'Confirmar para proceder',
    });

    this.selectedNoteId = noteId;
  }

  onConfirm() {
    this.messageService.clear();

    this.notesService
      .changeNoteStatus(this.selectedNoteId, NoteStatus.trashed)
      .subscribe((noteUpdated) => {
        this.changeNoteState(noteUpdated);
      });
  }

  onReject() {
    this.messageService.clear();
  }

  unArchive(noteId: number) {
    this.notesService
      .changeNoteStatus(noteId, NoteStatus.active)
      .subscribe((noteUpdated) => {
        this.changeNoteState(noteUpdated);
      });
  }
}
