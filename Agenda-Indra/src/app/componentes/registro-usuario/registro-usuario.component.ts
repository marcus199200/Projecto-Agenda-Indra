import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent implements OnInit {
  // Definir el formulario de registro
  registroForm!: FormGroup; //No esta inicializado



  // Bandera para mostrar errores de envío
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Configurar el formulario con validaciones
    this.registroForm = this.formBuilder.group({
      // Campos del formulario con sus validaciones
      nombre: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      apellido: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmarPassword: ['', Validators.required]
    }, {
      // Validador personalizado para comparar contraseñas
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmarPassword = form.get('confirmarPassword');

    if (password?.value !== confirmarPassword?.value) {
      confirmarPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmarPassword?.setErrors(null);
    }

    return null;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Marcar el formulario como enviado
    this.submitted = true;

    // Verificar si el formulario es válido
    if (this.registroForm.invalid) {
      return;
    }

    // Aquí iría la lógica de registro
    console.log('Datos de registro:', this.registroForm.value);

    // Ejemplo de navegación después del registro
    this.router.navigate(['/login']);
  }

  // Método para acceder fácilmente a los controles del formulario
  get f() {
    return this.registroForm.controls;
  }
}

