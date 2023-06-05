export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export interface CrearCursoPayload {
  nombre: string;
  descripcion: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}


export class CursoNuevo {
  id: number=0;
  nombre_c: string='';
  descripcion_c='';
  fecha_inicio_c: Date = new Date();
  fecha_fin_c: Date= new Date();
}

