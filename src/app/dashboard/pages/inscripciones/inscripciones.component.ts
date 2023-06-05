import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionesService } from './services/inscripciones.service';
import { Inscripcion } from './models';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { State } from './store/inscripciones.reducer';
import { selectInscripcionesState } from './store/inscripciones.selectors';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css'],
})
export class InscripcionesComponent implements OnInit {
  state$: Observable<State> ;
  
  constructor(
    private inscripcionesService: InscripcionesService,
    private store: Store
  ) {
    this.state$=this.store.select(selectInscripcionesState)
  }

  ngOnInit(): void {
    // this.inscripcionesService.getAllInscripciones().subscribe(console.log);
    this.store.dispatch(InscripcionesActions.loadInscripciones());
  }

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripciones({ id }));
  }
}

/*
export class InscripcionesComponent implements OnInit, OnDestroy{
  dataSource = new MatTableDataSource();
  inscripciones: Inscripcion[] = [];
  displayedColumns = [
    'id',
    'curso',
    'nombreCompleto',
   // 'detalle',
    'editar',
    'eliminar',
  ];

  constructor(
    private inscripcionesService: InscripcionesService,
    private matDialog: MatDialog
  ) {
    this.inscripcionesService
      .getInscripciones()
      .subscribe((res: Inscripcion[]) => {
        this.inscripciones = res;
      });
  }
  ngOnDestroy(): void {
  }

   
  
  ngOnInit(): void {
    this.inscripcionesService.getInscripciones().subscribe({
      next: (inscripciones) => {
        this.dataSource.data = inscripciones;
      },
    });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  eliminarInscripcion(insc: Inscripcion): void {
    this.inscripcionesService.eliminarInscripcion(insc.id);
  }

  editarInscripcion(inscripcionParaEditar: Inscripcion): void {
    {
      const dialog = this.matDialog.open(AbmInscripcionesComponent, {
        data: {
          inscripcionParaEditar,
        },
      });
      

      dialog.afterClosed().subscribe((valorDelFormulario) => {
        if (valorDelFormulario) {
          this.inscripcionesService.editarInscripcion(
            inscripcionParaEditar.id,
            valorDelFormulario
          );
          console.log(valorDelFormulario)
        }
      })
      
    }
  }

}
*/
