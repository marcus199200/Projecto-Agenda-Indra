import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contacto } from '../modelos/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // Datos que se van a cambiar antes de hacer el backend
  private contactos: Contacto[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      telefono: '123-456-7890',
      direccion: 'Calle Principal 123'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'García',
      email: 'maria@example.com',
      telefono: '234-567-8901'
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos@example.com',
      telefono: '345-678-9012',
      direccion: 'Avenida Central 456'
    }
  ];

  constructor() { }

  // Obtener lista de contactos
  obtenerListaDeContactos(): Observable<Contacto[]> {
    return of(this.contactos);
  }

  // Crear un nuevo contacto
  crearContacto(contacto: Contacto): Observable<Contacto> {
    // Generar un nuevo ID basado en el máximo actual
    const maxId = Math.max(...this.contactos.map(c => c.id || 0));
    const newContacto: Contacto = {
      ...contacto,
      id: maxId + 1
    };

    this.contactos.push(newContacto);
    return of(newContacto);
  }

  // Obtener un contacto por ID
  obtenerContactoPorId(id: number): Observable<Contacto> {
    const contacto = this.contactos.find(c => c.id === id);
    return of(contacto || { nombre: '', telefono: '' });
  }

  // Actualizar un contacto existente
  actualizarContacto(id: number, contacto: Contacto): Observable<Contacto> {
    const index = this.contactos.findIndex(c => c.id === id);

    if (index !== -1) {
      this.contactos[index] = { ...contacto, id };
      return of(this.contactos[index]);
    }

    return of(contacto);
  }

  // Eliminar un contacto
  eliminarContacto(id: number): Observable<boolean> {
    const index = this.contactos.findIndex(c => c.id === id);

    if (index !== -1) {
      this.contactos.splice(index, 1);
      return of(true);
    }

    return of(false);
  }
}
