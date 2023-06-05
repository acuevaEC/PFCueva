import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion, InscripcionWithAll } from '../models/index';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  loading:boolean;
  inscripciones: InscripcionWithAll[];
  error: unknown
  
}

export const initialState: State = {
loading: false,
inscripciones: [],
error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, state => {
    return{
      ... state,
      loading:true
    }
  }),

  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return{
      ... state,
      loading:false,
      inscripciones: action.data
    }
  }),

  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return{
      ... state,
      loading:false,
      error: action.error
    }
  }),

    // ELIMNAR POR ID

    on(InscripcionesActions.deleteInscripciones, (state) => {
      return {
        ...state,
        loading: true
      }
    }),
  
    on(InscripcionesActions.deleteInscripcionesSuccess, (state, action) => {
      return {
        ...state,
        inscripciones: state.inscripciones.filter((i) => i.id !== action.data),
        loading: false
      };
    }),
  
    on(InscripcionesActions.deleteInscripcionesFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }),
  

);



export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

