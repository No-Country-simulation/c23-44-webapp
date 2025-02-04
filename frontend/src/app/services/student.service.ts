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
}
@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:3001/student';

  constructor(private http: HttpClient) {}

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }




  //createStudent(student: Student): Observable<Student> {
    //return this.http.post<Student>(this.apiUrl, student);
  //}

  //getStudents(): Observable<Student[]> {
    //return this.http.get<Student[]>(this.apiUrl);
  //}

  //updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    //return this.http.patch<Student>(`${this.apiUrl}/${id}`, student);
  //}

  //deleteStudent(id: string): Observable<void> {
    //return this.http.delete<void>(`${this.apiUrl}/${id}`);
  //}
}

