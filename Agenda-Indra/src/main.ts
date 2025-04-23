// Punto de entrada de una aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// La funccion bootstrap empieza tu aplicacion con 2 argumentos
// 1. El componente root empieza angular
// 2. El objeto configurador con "providers"
bootstrapApplication(AppComponent, {
  providers: [

    provideHttpClient(

      withInterceptors([
      ])
    ),

    // Entrega la funcionalidad del router
    provideRouter(routes),
    ]


}).catch(err => console.error(err)); // Maneja errores
