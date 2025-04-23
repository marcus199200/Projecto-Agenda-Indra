import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContactoService } from '../../servicios/contacto.service';
import { Contacto } from '../../modelos/contacto';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent implements OnInit {
  contactos: Contacto[] = [];

  constructor(
    private contactoService: ContactoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarContactos();
  }

  private cargarContactos(): void {
    this.contactoService.obtenerListaDeContactos().subscribe(
      (datos) => {
        this.contactos = datos;
      },
      (error) => {
        console.error('Error al cargar los contactos:', error);
      }
    );
  }

  // Método para editar un contacto
  editarContacto(contacto: Contacto): void {
    if (contacto.id !== undefined) {
      this.router.navigate(['/actualizar-contacto', contacto.id]);
    } else {
      console.error('No se puede editar un contacto sin ID');
    }
  }

  // Método para eliminar un contacto
  eliminarContacto(id: number | undefined): void {
    // Verificar que el ID existe
    if (id === undefined) {
      console.error('No se puede eliminar un contacto sin ID');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      this.contactoService.eliminarContacto(id).subscribe(
        () => {
          console.log('Contacto eliminado con éxito');
          this.cargarContactos(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar el contacto:', error);
        }
      );
    }
  }

  // Método para ver detalles de un contacto
  verDetallesDelContacto(id: number | undefined): void {
    if (id === undefined) {
      console.error('No se puede ver detalles de un contacto sin ID');
      return;
    }
    this.router.navigate(['/detalle-contacto', id]);
  }
}

