// student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEdit = false;
  studentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Nuevo campo
      role: ['student', [Validators.required]], // Valor por defecto
      country: ['', [Validators.required]],
      isActive: [true] // Valor por defecto
    });
    }
    //this.studentForm = this.fb.group({
      //fullName: ['', Validators.required],
      //email: ['', [Validators.required, Validators.email]],
      //country: ['', Validators.required]
    //});


  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.isEdit = true;
      this.studentService.getStudents().subscribe(students => {
        const student = students.find((s: any) => s.id === this.studentId);
        if (student) {
          this.studentForm.patchValue(student);
        }
      });
    }
  }

  onSubmit() {
    console.log('Valores del formulario:', this.studentForm.value);
    console.log('Errores del formulario:', this.studentForm.errors);
    console.log('Estado del formulario:', this.studentForm.status);

    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      console.log('Datos enviados al servidor:', studentData);
      const operation = this.isEdit && this.studentId ?
        this.studentService.updateStudent(this.studentId, studentData) :
        this.studentService.createStudent(studentData);

      operation.subscribe({
        next: () => {
          console.log('Estudiante guardado correctamente');
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Error al guardar el estudiante:', error);
          alert('Ocurrió un error al guardar el estudiante. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      console.warn('El formulario no es válido');
      this.markFormGroupTouched(this.studentForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  //onSubmit() {
    //if (this.studentForm.valid) {
      //if (this.isEdit && this.studentId) {
        //this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe(() => {
          //this.router.navigate(['/child-profile']);
        //});
      //} else {
        //this.studentService.createStudent(this.studentForm.value).subscribe(() => {
          //this.router.navigate(['/child-profile']);
        //});
      //}
    //}
  //}
}
