import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  country: string;
  isActive: boolean;
  image?: string; // URL de la imagen
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:3001/student';
  //private imageUploadUrl = 'http://localhost:3001/upload'; // Endpoint para subir imágenes

  constructor(private http: HttpClient) {}

  // Método para subir una imagen
  //uploadImage(file: File): Observable<{ imageUrl: string }> {
    //const formData = new FormData();
   // formData.append('image', file, file.name);
   // return this.http.post<{ imageUrl: string }>(this.imageUploadUrl, formData);
 // }

  // Método para crear un estudiante
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Método para actualizar un estudiante
  updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${id}`, student);
  }

  // Métodos existentes (sin cambios)
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // Método para obtener un estudiante por su ID
  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}