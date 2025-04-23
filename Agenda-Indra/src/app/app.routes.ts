import { Routes } from '@angular/router';
import { ListaContactosComponent } from './componentes/lista-contactos/lista-contactos.component';
import { DetallesContactosComponent } from './componentes/detalles-contactos/detalles-contactos.component';
import { CrearContactoComponent } from './componentes/adicionar-contactos/adicionar-contactos.component';
import { EditarContactosComponent } from './componentes/editar-contactos/editar-contactos.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contactos', pathMatch: 'full' },
  { path: 'contactos', component: ListaContactosComponent, title: 'Lista de Contactos' },
  //Define la primera pagina que se va a cargar (como el homepage)
  { path: 'detalle-contacto/:id', component: DetallesContactosComponent, title: 'Detalles del Contacto' },
  { path: 'crear-contacto', component: CrearContactoComponent, title: 'Crear Contacto' },
  { path: 'actualizar-contacto/:id', component: EditarContactosComponent, title: 'Actualizar Contacto' },
  { path: 'registro', component: RegistroUsuarioComponent },
  //define la ruta de los componentes

  { path: '**', redirectTo: '/contactos' },]
//Si el usuario vaya a una ruta que no existe lo redirige a la pagina principal




