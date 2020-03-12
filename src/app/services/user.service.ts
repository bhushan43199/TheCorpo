import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }


    getAllUsers() {
        return this.http.get<any>(appConfig.apiUrl + '/user/getAllUsers')
            .map(res => {
                return res;
            });
    }

    deleteUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/deleteUser', user)
            .map(res => {
                return res;
            });
    }

    register(user) {
        return this.http.post<any>(appConfig.apiUrl + '/auth/register', user)
            .map(res => {
                return res;
            });
    }

    activeInactiveUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/activeInactiveUser', user)
            .map(res => {
                return res;
            });
    }

    updateUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/updateUser', user)
            .map(res => {
                return res;
            });
    }

    createUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/createUser', user)
            .map(res => {
                return res;
            });
    }

    sendemail(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/sendMultipleEmail', user)
            .map(res => {
                return res;
            });
    }

    getLoggedInUser() {
        return this.http.get<any>(appConfig.apiUrl + '/user/getUser')
            .map(res => {
                return res;
            });
    }
  }
