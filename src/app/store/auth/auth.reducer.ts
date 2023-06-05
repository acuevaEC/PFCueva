import { createReducer, on } from "@ngrx/store";
import { Usuario } from "src/app/core/models";
import { EstablecerUsuarioAutenticado, QuitarUsuarioAutenticado } from "./auth.actions";


export const authFeatureKey= 'auth';

export interface AuthState {
    authUser: Usuario | null;
    token: string | null;
}
const initialState: AuthState = {
    authUser: null,
    token: localStorage.getItem('token') || null,
}

export const authReducer =createReducer(
    initialState,
    on(EstablecerUsuarioAutenticado, (currentState, action) => {
        return{
            authUser: action.payload,
            token: action.payload.token
        }
    }),
    on(QuitarUsuarioAutenticado, (currentState) =>{
        return initialState
    })

)