/** Clase Paciente */
export class Paciente {
    constructor(
        public idPersona: number,
        public nombre: string,
        public apellido: string,
        public telefono: string,
        public email: string,
        public ruc: string,
        public cedula: string,
        public tipoPersona: string,
        public fechaDeNacimiento: string,
    ) {}
}