import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/notes.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  providers: [MessageService],
})
export class ArchivePageComponent implements OnInit {
  notes: Note[] = [
    {
      date: new Date(),
      title: 'Nota 1',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing',
    },
    {
      date: new Date(),
      title: 'Nota 2',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing',
    },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'deleteToast',
      summary: '¿Desea eliminar esta nota?',
      sticky: true,
      severity: 'warn',
      detail: 'Confirmar para proceder',
    });
  }

  onConfirm() {
    this.messageService.clear();
  }

  onReject() {
    this.messageService.clear();
  }

  unArchive() {
    // TODO: implement undo archive
    console.log('undo archive');
  }
}
