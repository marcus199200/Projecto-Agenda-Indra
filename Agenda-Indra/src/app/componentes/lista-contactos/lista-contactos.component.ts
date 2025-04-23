import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactoService } from '../../servicios/contacto.service';
import { Contacto } from '../../modelos/contacto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListaContactosComponent implements OnInit {
  // Lista original de contactos
  contactosOriginales: Contacto[] = [];

  // Lista de contactos para mostrar
  contactos: Contacto[] = [];

  // Término de búsqueda
  terminoBusqueda: string = '';

  constructor(
    private contactoService: ContactoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.contactoService.obtenerListaDeContactos().subscribe(
      (datos) => {
        this.contactosOriginales = datos;
        this.contactos = [...this.contactosOriginales];
      },
      (error) => {
        console.error('Error al cargar los contactos:', error);
      }
    );
  }

  // Método para buscar contactos
  buscarContactos(): void {
    // Mostrar los contactos, aunque nada se busque.
    if (!this.terminoBusqueda.trim()) {
      this.contactos = [...this.contactosOriginales];
      return;
    }

    // Hacer que la busqueda sea independiente si es lower o upper case
    const termino = this.terminoBusqueda.toLowerCase().trim();

    // Filtrar contactos
    this.contactos = this.contactosOriginales.filter(contacto =>
      (contacto.nombre || '').toLowerCase().includes(termino) ||
      (contacto.apellido || '').toLowerCase().includes(termino) ||
      (contacto.email || '').toLowerCase().includes(termino) ||
      (contacto.telefono || '').toLowerCase().includes(termino)
    );
  }

  // Va a la pagina crear contacto
  irACrearContacto(): void {
    this.router.navigate(['/crear-contacto']);
  }

  // Método detalles de un contacto
  verDetallesDelContacto(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/detalle-contacto', id]);
    }
  }

  // Método editar contacto
  editarContacto(contacto: Contacto): void {
    if (contacto.id !== undefined) {
      this.router.navigate(['/actualizar-contacto', contacto.id]);
    }
  }

  // Método para eliminar un contacto
  eliminarContacto(id: number | undefined): void {
    if (id !== undefined) {
      // Confirma antes de eliminar
      if (confirm('¿Está seguro de que quiere eliminar este contacto?')) {
        this.contactoService.eliminarContacto(id).subscribe({
          next: (resultado) => {
            if (resultado) {
              // Recargar la lista de contactos después de eliminar
              this.cargarContactos();
            }
          },
          error: (error) => {
            console.error('Error al eliminar el contacto', error);
          }
        });
      }
    }
  }
}
