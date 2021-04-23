import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Note, NoteStatus } from '../interfaces/notes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get headers() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('x-access-token')}`
    );
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this._apiUrl}/notes`, {
      headers: this.headers,
    });
  }

  getNote(noteId: string): Observable<Note> {
    return this.http.get<Note>(`${this._apiUrl}/notes/${noteId}`, {
      headers: this.headers,
    });
  }

  saveNote(title: string, content: string) {
    return this.http.post<Note>(
      `${this._apiUrl}/notes`,
      { title, content },
      { headers: this.headers }
    );
  }

  updateNote(noteId: number, title: string, content: string) {
    return this.http.put<Note>(
      `${this._apiUrl}/notes/${noteId}`,
      { title, content },
      { headers: this.headers }
    );
  }

  changeNoteStatus(noteId: number, status: NoteStatus) {
    return this.http.put<Note>(
      `${this._apiUrl}/notes/status/${noteId}`,
      { status },
      { headers: this.headers }
    );
  }

  deleteNote(noteId: number) {
    return this.http.delete<Note>(`${this._apiUrl}/notes/${noteId}`, {
      headers: this.headers,
    });
  }
}
