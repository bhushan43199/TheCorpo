import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/auth/login', { EMAIL: email, PASSWORD: password })
            .map(user => {
                // login successful if there's a jwt token in the respons
                console.log(user)
                if (user && user.token) {
                    console.log(user);
                    localStorage.setItem('currentUser', user.user);
                    localStorage.setItem('token', JSON.stringify(user.token));
                    localStorage.setItem('ROLE', JSON.stringify(user.user.ROLE));
                }
                return user;
            });
    }

    public isAuthenticated(): boolean {
        const token = JSON.parse(localStorage.getItem('token'));
        const helper = new JwtHelperService();
        console.log(!helper.isTokenExpired(token));
        return !helper.isTokenExpired(token);
    }

    public isLogout() {
        localStorage.removeItem('token');
        localStorage.clear();
    }

    logout() {
        localStorage.removeItem('token');
    }
}
