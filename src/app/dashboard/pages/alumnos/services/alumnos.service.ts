import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { Alumno } from '../alumnos.component';
import { HttpClient } from '@angular/common/http';
import { CrearAlumnoPayload } from '../../inscripciones/models';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  private alumnos$ = new BehaviorSubject<Alumno[]>(
    []
  );

  constructor(private httpcliente: HttpClient) { }


  obtenerAlumnos(): Observable<Alumno[]> {
    //return this.estudiantes$.asObservable();
    return this.httpcliente.get<Alumno[]>(`http://localhost:3000/students`)
  }


  obtenerAlumnoPorId(id: number): Observable<Alumno| undefined> {
    return this.httpcliente.get<Alumno>(`http://localhost:3000/students?id=${id}`)
  }
  
  crearAlumno(payload: CrearAlumnoPayload): void {
    const body = {
      nombre: payload.nombre,
      apellido: payload.apellido,
      fecha_registro: new Date(),
    };
    
    this.httpcliente.post<Alumno>(`http://localhost:3000/students`,body).subscribe()
  }
  
}
