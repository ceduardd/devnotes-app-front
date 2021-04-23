import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Note, NoteStatus } from '../../interfaces/notes.interfaces';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-trash-page',
  templateUrl: './trash.component.html',
  providers: [MessageService],
})
export class TrashComponent implements OnInit {
  notes: Note[] = [];
  selectedNoteId!: number;

  constructor(
    private messageService: MessageService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.notesService.getAllNotes().subscribe((notes) => {
      this.notes = notes.filter((note) => note.status === NoteStatus.trashed);
    });
  }

  changeNoteState(noteUpdated: Note) {
    this.notes = this.notes.map((note) =>
      note.id !== noteUpdated.id ? { ...note } : { ...noteUpdated }
    );
    this.notes = this.notes.filter(
      (note) => note.status === NoteStatus.trashed
    );
  }

  showConfirm(noteId: number) {
    this.messageService.clear();
    this.messageService.add({
      key: 'deleteToast',
      summary: '¿Desea eliminar esta nota de manera permanente?',
      sticky: true,
      severity: 'warn',
      detail: 'Confirmar para proceder',
    });

    this.selectedNoteId = noteId;
  }

  onConfirm() {
    this.messageService.clear();

    this.notesService
      .deleteNote(this.selectedNoteId)
      .subscribe((noteDeleted) => {
        this.notes = this.notes.filter((note) => note.id !== noteDeleted.id);
      });
  }

  onReject() {
    this.messageService.clear();
  }

  restoreNote(noteId: number) {
    this.notesService
      .changeNoteStatus(noteId, NoteStatus.active)
      .subscribe((noteUpdated) => {
        this.changeNoteState(noteUpdated);
      });
  }
}
