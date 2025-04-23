// src/app/servicios/email.service.ts
import { Injectable } from '@angular/core';
import { Contacto } from '../modelos/contacto';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Método para abrir cliente de email predeterminado
  enviarEmailDirecto(contacto: Contacto) {
    if (contacto.email) {
      // Abre el cliente de email predeterminado
      window.location.href = `mailto:${contacto.email}`;
    } else {
      alert('No hay email disponible para este contacto');
    }
  }

  // Método para copiar email al portapapeles
  copiarEmail(contacto: Contacto) {
    if (contacto.email) {
      navigator.clipboard.writeText(contacto.email).then(() => {
        alert('Email copiado al portapapeles');
      }).catch(err => {
        console.error('Error al copiar email', err);
      });
    } else {
      alert('No hay email disponible para este contacto');
    }
  }
}

