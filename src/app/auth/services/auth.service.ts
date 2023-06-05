import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, map, catchError, throwError, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { AppState } from 'src/app/store';
import { EstablecerUsuarioAutenticado, QuitarUsuarioAutenticado } from 'src/app/store/auth/auth.actions';
import { selectAuthUsuer } from 'src/app/store/auth/auth.selectors';
import { environment } from 'src/environments/environment'; 
export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>,
  ) { }

  establecerUsuarioAutenticado(usuario: Usuario, token: string): void {
    this.store.dispatch(EstablecerUsuarioAutenticado({payload:{... usuario, token }}));
   // this.authUser$.next(usuario);
   // this.store.dispatch(EstablecerUsuarioAutenticado({ payload: { ...usuario, token } }));
  }
  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    //console.log(this.authUser$.value?.apellido)
    return this.store.select(selectAuthUsuer);
   // return this.authUser$.asObservable();
      }

  login(formValue: LoginFormValue): void {

    this.httpClient.get<Usuario[]>(
      `http://localhost:3000/usuarios`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
          this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario y contraseña incorrectos!')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    //this.authUser$.next(null);
    this.store.dispatch(QuitarUsuarioAutenticado());
    this.router.navigate(['auth']);
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `http://localhost:3000/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          
         alert("Verificar que este corriendo json Server")
          return of(false);
        })
      );
  }
}
