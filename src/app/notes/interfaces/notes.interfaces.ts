export enum NoteStatus {
  active,
  archived,
  trashed,
}

export interface Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  status?: NoteStatus;
}
