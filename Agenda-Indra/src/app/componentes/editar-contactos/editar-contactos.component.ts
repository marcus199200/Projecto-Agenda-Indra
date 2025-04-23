import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from '../../servicios/contacto.service';
import { Contacto } from '../../modelos/contacto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-contactos',
  templateUrl: './editar-contactos.component.html',
  styleUrl: './editar-contactos.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditarContactosComponent implements OnInit {
  // Objeto para almacenar los datos del contacto que se va a editar
  // Inicializado con valores vacíos para evitar errores
  contacto: Contacto = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  constructor(
    // Inyección de dependencias para manejar rutas y servicios
    private route: ActivatedRoute,
    private contactoService: ContactoService,
    private router: Router
  ) {}

  // Método de inicialización del componente
  ngOnInit(): void {
    // Obtener el ID del contacto desde la URL
    const idParam = this.route.snapshot.paramMap.get('id');

    // Verificar que se haya proporcionado un ID válido
    if (idParam !== null) {
      // Convertir el ID de string a número
      const id = +idParam;

      // Llamar al servicio para obtener los detalles del contacto
      this.contactoService.obtenerContactoPorId(id).subscribe({
        next: (contacto) => {
          // Asignar los datos del contacto recuperado al formulario
          this.contacto = contacto;
        },
        error: (error) => {
          // Manejo de errores si no se puede cargar el contacto
          console.error('Error al cargar los detalles del contacto', error);
          // Redirigir a la lista de contactos en caso de error
          this.router.navigate(['/contactos']);
        }
      });
    }
  }

  // Método para guardar los cambios realizados en el contacto
  guardarCambios(): void {
    // Primero validar que los campos obligatorios estén completos
    if (this.validarCampos()) {
      // Verificar que el contacto tenga un ID (necesario para actualización)
      if (this.contacto.id !== undefined) {
        // Llamar al servicio para actualizar el contacto
        // Pasar tanto el ID como el objeto de contacto completo
        this.contactoService.actualizarContacto(this.contacto.id, this.contacto).subscribe({
          next: () => {
            // Navegar de vuelta a la lista de contactos después de actualizar
            this.router.navigate(['/contactos']);
          },
          error: (error) => {
            // Manejo de errores durante la actualización
            console.error('Error al actualizar el contacto', error);
            // Opcional: mostrar un mensaje de error al usuario
            alert('No se pudo actualizar el contacto');
          }
        });
      } else {
        // Manejar el caso improbable de un contacto sin ID
        console.error('No se puede actualizar un contacto sin ID');
        alert('No se puede actualizar el contacto. Falta información.');
      }
    }
  }

  // Método privado para validar campos obligatorios
  private validarCampos(): boolean {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.contacto.nombre || !this.contacto.telefono) {
      // Mostrar una alerta si los campos obligatorios están vacíos
      alert('Por favor, complete los campos obligatorios (Nombre y Teléfono)');
      return false;
    }
    return true;
  }

  // Método para cancelar la edición y volver a la lista de contactos
  cancelar(): void {
    // Navegar de vuelta a la lista de contactos sin guardar cambios
    this.router.navigate(['/contactos']);
  }
}
