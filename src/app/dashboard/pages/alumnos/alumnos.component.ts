import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';
//import { InscripcionesService } from '../inscripciones/services/inscripciones.service';
import { AlumnoDetalleComponent } from './pages/alumno-detalle/alumno-detalle.component';
import { Inscripcion } from '../inscripciones/models';
import { HttpClient } from '@angular/common/http';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo.pipe';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fecha_registro: Date;
}

@Component({
  selector: 'app-tablas',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  dataSource = new MatTableDataSource<Alumno>();

  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'fecha_registro',
    'ver_detalle',
    'eliminar',
    'editar',
  ];
 

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private httpcliente: HttpClient
  ) // private InscripcionesService: InscripcionesService,
  {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.dataSource.data = alumnos;
    });
  }
  /*
  irAlDetalle(alumnoId: number): void {
    this.alumnosService
    .obtenerAlumnoPorId(alumnoId)
    .subscribe((element: Alumno | undefined) => {
      this.InscripcionesService
        .getInscipcionesDeAlumnos(element!.id)
        .subscribe((res: Inscripcion[] | undefined) => {
          let inscs = res;
          const dialog = this.matDialog.open(AlumnoDetalleComponent, {

            data: {
              element,
              inscs,
            },
          });
        });
    })
    
  }
*/
  crearAlumno(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    console.log('here')
    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.alumnosService.crearAlumno(formValue)
          this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
            this.dataSource.data = alumnos;
          });
        }
      });
  }

  eliminarAlumno(alumnoParaEliminar: Alumno): void {
    
    this.dataSource.data = this.dataSource.data.filter(
      (alumnoActual) => alumnoActual.id !== alumnoParaEliminar.id
    )
    this.httpcliente.delete(`http://localhost:3000/students/${alumnoParaEliminar.id}`).subscribe()
  }


  editarAlumno(alumnoParaEditar: Alumno): void {
    let idAlumno: number = 0;
    let actualizadoAlumno: Alumno;
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar,
      },
    });

    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map((alumnoActual) =>
          alumnoActual.id === alumnoParaEditar.id
            ? { ...alumnoActual, ...valorDelFormulario }
            : alumnoActual
        );
        actualizadoAlumno =
          this.dataSource.data[
            this.dataSource.data.findIndex((x) => x.id === alumnoParaEditar.id)
          ];
        const body = {
          nombre: actualizadoAlumno.nombre,
          apellido: actualizadoAlumno.apellido,
          fecha_registro: actualizadoAlumno.fecha_registro,
        };
        this.httpcliente
          .put(`http://localhost:3000/students/${alumnoParaEditar.id}`, body)
          .subscribe();
      }
    });
  }
}
