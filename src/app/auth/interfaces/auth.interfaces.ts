export interface AuthResponse {
  ok: boolean;
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
}
