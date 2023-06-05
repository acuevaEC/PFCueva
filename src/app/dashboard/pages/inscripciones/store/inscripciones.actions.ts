import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscripcionWithAll } from '../models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: InscripcionWithAll[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
    'Delete Inscripciones': props<{ id: number }>(),
    'Delete Inscripciones Success': props<{ data: number }>(),
    'Delete Inscripciones Failure': props<{ error: unknown }>(),
  }
});
