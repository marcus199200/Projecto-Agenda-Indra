import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactoService } from '../../servicios/contacto.service';
import { Contacto } from '../../modelos/contacto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Propio de typescript, un decorador, con las funciones del componente
@Component({
  selector: 'app-crear-contacto',
  templateUrl: './adicionar-contactos.component.html',
  styleUrl: './adicionar-contactos.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CrearContactoComponent {
  // Objeto que almacena los datos del nuevo contacto con valores iniciales vacíos
  nuevoContacto: Contacto = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  // Constructor que inyecta los servicios necesarios (creador de instáncias)
  constructor(
    private contactoService: ContactoService, // Servicio para operaciones CRUD de contactos
    private router: Router // Servicio para navegar entre componentes
  ) {}

  // Método que se ejecuta al guardar un contacto
  guardarContacto(): void {
    // Primero valida que los campos requeridos estén completos
    if (this.validarCampos()) {
      // Va al servicio para crear contacto y suscribe a la respuesta
      this.contactoService.crearContacto(this.nuevoContacto).subscribe({
        // Función que se ejecuta cuando la operación es exitosa
        next: () => {
          // Navega a la lista de contactos tras crear el contacto
          this.router.navigate(['/contactos']);
        },
        // Función que se ejecuta cuando hay un error
        error: (error) => {
          // Registra el error en la consola
          console.error('Error al crear el contacto', error);
          // Muestra una alerta al usuario
          alert('No se pudo crear el contacto');
        }
      });
    }
  }

  // Método para ver que estén los datos requeridos
  private validarCampos(): boolean {
    // Verifica si nombre o teléfono están vacíos
    if (!this.nuevoContacto.nombre || !this.nuevoContacto.telefono) {
      // Muestra alerta al usuario si faltan campos obligatorios
      alert('Por favor, complete los campos obligatorios (Nombre y Teléfono)');
      // Retorna falso para detener el proceso de guardado
      return false;
    }
    // Si todo está completo, retorna verdadero
    return true;
  }

  // Método para cancelar la creación y volver a la lista
  cancelar(): void {
    // Navega de vuelta a la lista de contactos sin crear uno nuevo
    this.router.navigate(['/contactos']);
  }
}

