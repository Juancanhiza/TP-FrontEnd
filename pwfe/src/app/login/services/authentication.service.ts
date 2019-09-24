import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    
    hhtpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    constructor(private http: HttpClient) {}
    /*
    login(username: string, password: string) {
        return this.http.post<any>(`localhost:4200/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }*/

    getUsuarioLogin(element): Observable<any> {
        var params = new HttpParams();
        params = params.append('ejemplo', JSON.stringify(element));
        return this.http.get('/stock-pwfe/persona/', { params: params});
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}