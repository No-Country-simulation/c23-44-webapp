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
  selectedFile: File | null = null; // Variable para almacenar la imagen seleccionada

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
      isActive: [true], // Valor por defecto
      image: [''] // Campo para la imagen (opcional)
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

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Opcional: Mostrar una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Aquí puedes mostrar la vista previa en el HTML si lo deseas
        console.log('Vista previa de la imagen:', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      this.saveStudent(studentData);
      // if (this.selectedFile) {
      //   // Subir la imagen primero
      //   this.studentService.uploadImage(this.selectedFile).subscribe({
      //     next: (response) => {
      //       // Agregar la URL de la imagen al JSON del estudiante
      //       studentData.image = response.imageUrl;
  
      //       // Llamar al servicio para crear o actualizar
      //       this.saveStudent(studentData);
      //     },
      //     error: (error) => {
      //       console.error('Error al subir la imagen:', error);
      //       alert('Ocurrió un error al subir la imagen. Por favor, inténtalo de nuevo.');
      //     }
      //   });
      // } else {
      //   // Si no hay imagen, enviar el JSON directamente
      //   this.saveStudent(studentData);
      // }
    } else {
      console.warn('El formulario no es válido');
    }
  }
  
  // Método para guardar el estudiante
  saveStudent(studentData: any) {
    const operation = this.isEdit && this.studentId ?
      this.studentService.updateStudent(this.studentId, studentData) :
      this.studentService.createStudent(studentData);
  
    operation.subscribe({
      next: () => {
        console.log('Estudiante guardado correctamente');
        this.router.navigate(['/child-profile/id']);
      },
      error: (error) => {
        console.error('Error al guardar el estudiante:', error);
        alert('Ocurrió un error al guardar el estudiante. Por favor, inténtalo de nuevo.');
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
