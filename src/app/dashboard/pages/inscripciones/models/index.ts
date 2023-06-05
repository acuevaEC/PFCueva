export interface Curso {
    id: number;
    nombre: string;
    fecha_inicio: Date;
    fecha_fin: Date;
  }

  export interface Alumno {
    id: number,
    nombre: string,
    apellido: string,
    fecha_registro: Date;
  }
  export interface CrearAlumnoPayload {
    id: number,
    nombre: string,
    apellido: string,
    fecha_registro: Date;
  }

    export interface Inscripcion {
    id: number;
    alumno: Alumno;
    curso: Curso;
  }

  export interface InscripcionWithStudent extends Inscripcion {
    student: Alumno;
  }
   
  export interface InscripcionWithCourse extends Inscripcion {
    course: Curso;
  }
  
  export interface CreateInscripcionData {
    studentId: number;
    courseId: number;
  }
  
  export type InscripcionWithAll = InscripcionWithStudent & InscripcionWithCourse;