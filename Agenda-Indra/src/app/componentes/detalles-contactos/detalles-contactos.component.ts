import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from '../../servicios/contacto.service';
import { EmailService } from '../../servicios/email.service';
import { Contacto } from '../../modelos/contacto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-contactos',
  templateUrl: './detalles-contactos.component.html',
  styleUrl: './detalles-contactos.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class DetallesContactosComponent implements OnInit {
  contacto: Contacto | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactoService: ContactoService,
    private emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = +idParam;

      this.contactoService.obtenerContactoPorId(id).subscribe({
        next: (contacto) => {
          this.contacto = contacto;
        },
        error: (error) => {
          console.error('Error al cargar los detalles del contacto', error);
          this.router.navigate(['/contactos']);
        }
      });
    }
  }

  // Método para enviar email
  enviarEmail() {
    if (this.contacto) {
      this.emailService.enviarEmailDirecto(this.contacto);
    }
  }

  // Método para copiar email
  copiarEmail() {
    if (this.contacto) {
      this.emailService.copiarEmail(this.contacto);
    }
  }

  volverALista() {
    this.router.navigate(['/contactos']);
  }
}



