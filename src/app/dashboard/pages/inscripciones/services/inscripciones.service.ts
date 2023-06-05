import { Injectable } from '@angular/core';
import { Curso, Alumno, Inscripcion } from '../models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InscripcionWithAll } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  constructor(private httpCliente: HttpClient) {}

  getAllInscripciones(): Observable<InscripcionWithAll[]> {
    return this.httpCliente.get<InscripcionWithAll[]>(
      `http://localhost:3000/inscriptions?_expand=course&_expand=student`
    );
  }

  deleteInscripcionById(id: number): Observable<unknown> {
    return this.httpCliente.delete(
      `http://localhost:3000/inscriptions/${id}`
    );
  }
}

/*

// CURSOS, ALUMNOS E INSCRIPCIOENS MOCKS //

const CURSOS_MOCKS: Curso[] = [
  {
    id: 1,
    nombre: 'Angular',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 2,
    nombre: 'Javascript',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 3,
    nombre: 'Desarrollo Web',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
];

const ALUMNO_MOCKS: Alumno[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Parra',
    fecha_registro: new Date(),
  },
  {
    id: 2,
    nombre: 'Daniel',
    apellido: 'Parra',
    fecha_registro: new Date(),
  },
  {
    id: 3,
    nombre: 'Maria',
    apellido: 'Parra',
    fecha_registro: new Date(),
  },
];

const INSCRIPICIONES_MOCK: Inscripcion[] = [
  {
    id: 1,
    alumno: ALUMNO_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(0)!
  },
  {
    id: 2,
    alumno: ALUMNO_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(1)!
  },
  
  {
    id: 3,
    alumno: ALUMNO_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(2)!
  },
  {
    id: 4,
    alumno: ALUMNO_MOCKS.at(1)!,
    curso: CURSOS_MOCKS.at(0)!
  },
  {
    id: 5,
    alumno: ALUMNO_MOCKS.at(1)!,
    curso: CURSOS_MOCKS.at(1)!
  },
  
  {
    id: 6,
    alumno: ALUMNO_MOCKS.at(2)!,
    curso: CURSOS_MOCKS.at(0)!
  },
];

@Injectable({
  providedIn: 'root'
})



export class InscripcionesService {

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>(
    INSCRIPICIONES_MOCK
  );
  constructor() { 
    //private alumno
  }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.inscripciones$.asObservable();
  }

  getInscipcionesDeAlumnos(
    AlumnoId: number
  ): Observable<Inscripcion[] | undefined> {
    return this.inscripciones$.pipe(
      map((Inscripciones: any[]) =>
        Inscripciones.filter((a: { alumno: { id: number; }; }) => a.alumno.id == AlumnoId)
      )
    );
  }

  getInscipcionesDeCurso(
    cursoId: number
  ): Observable<Inscripcion[] | undefined> {
    return this.inscripciones$.pipe(
      map((Inscripciones) => Inscripciones.filter((a) => a.curso.id == cursoId))
    );
  }

  eliminarInscripcion(inscripcionId: number): Observable<Inscripcion[]> {
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        
        const inscripcionesActualizados = inscripciones.filter(
          (inscripcion) => inscripcion.id !== inscripcionId
        );
        this.inscripciones$.next(inscripcionesActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.inscripciones$.asObservable();
  }

  editarInscripcion(
    inscripcionId: number,
    actualizacion: Partial<Inscripcion>
  ): Observable<Inscripcion[]> {
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        const inscripcionesActualizados = inscripciones.map((inscripcion) => {
          if (inscripcion.id === inscripcionId) {
            return {
              ...inscripcion,
              ...actualizacion,
            };
          } else {
            return inscripcion;
          }
        });
        console.log(inscripcionesActualizados)

        this.inscripciones$.next(inscripcionesActualizados);
      },
      //complete: () => {},
      //error: () => {}
    });

    return this.inscripciones$.asObservable();
  }

  
}
*/
