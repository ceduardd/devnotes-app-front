import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html',
  providers: [MessageService],
})
export class EditorComponent implements OnInit {
  noteId!: number;

  noteForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.notesService.getNote(params.id).subscribe((res) => {
          this.noteId = res.id;
          this.resetForm(res.title, res.content);
        });
      } else {
        console.log('no vino el id');
      }
    });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'discardToast',
      sticky: true,
      severity: 'warn',
      summary: '¿Estas seguro de descartar los cambios?',
      detail: 'Confrmar para proceder',
    });
  }

  showToast(severity: string, summary: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'feedbackToast',
      sticky: true,
      severity,
      summary,
    });
  }

  onConfirm() {
    this.messageService.clear('discardToast');

    // Call to discard changes method
    this.discardChanges();
  }

  onReject() {
    this.messageService.clear('discardToast');
  }

  goBack() {
    if (!this.noteForm.pristine) {
      this.showConfirm();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  discardChanges() {
    // TODO: implement discard changes method
    this.router.navigateByUrl('/');
  }

  resetForm(title: string, content: string) {
    this.noteForm.reset({
      title,
      content,
    });
  }

  saveChanges() {
    // TODO: implement save changes method

    if (this.noteForm.invalid) {
      this.showToast('error', 'Complete todos los campos');
      return;
    } else {
      const { title, content } = this.noteForm.value;

      if (this.noteId) {
        this.notesService
          .updateNote(this.noteId, title, content)
          .subscribe((res) => {
            const { title, content } = res;

            this.resetForm(title, content);

            this.showToast('success', 'Nota actualizada');
          });
      } else {
        this.notesService.saveNote(title, content).subscribe((res) => {
          const { title, content } = res;

          this.resetForm(title, content);

          this.showToast('success', 'Nota guardada');
        });
      }
    }
  }
}
