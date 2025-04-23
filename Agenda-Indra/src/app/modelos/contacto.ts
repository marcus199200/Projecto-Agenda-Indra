export interface Contacto {
  //?es opcional
  //sin? es obligatorio
  //metadata estructura de usuario
  id?: number;
  nombre: string;
  apellido?: string;
  email?: string;
  telefono: string;
  direccion?: string;
}
