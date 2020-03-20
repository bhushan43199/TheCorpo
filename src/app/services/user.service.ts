import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }


    forgotPassword(data){
        return this.http.post<any>(appConfig.apiUrl + '/user/forgotPassword' , data)
        .map(res => {
            return res;
        });
    }

    getVenueImagebyId(id){
        return this.http.get<any>(appConfig.apiUrl + '/user/getVanueImagesById/'+id)
        .map(res => {
            return res;
        });
    }

    getEmailDataById(id) {
        
        return this.http.get<any>(appConfig.apiUrl + '/email/getEmailDataById/'+ id)
            .map(res => {
                return res;
            });
    }

    getReplyEmailById(id) {
        
        return this.http.get<any>(appConfig.apiUrl + '/email/getReplyEmailById/'+ id)
            .map(res => {
                return res;
            });
    }    

    emailReadStatus(obj) {
        return this.http.post<any>(appConfig.apiUrl + '/email/isRead', obj)
            .map(res => {
                return res;
            });
    }


    sendMail(obj) {
        return this.http.post<any>(appConfig.apiUrl + '/email/sendEmail', obj)
            .map(res => {
                return res;
            });
    }

    
    replyEmail(obj) {
        return this.http.post<any>(appConfig.apiUrl + '/email/replyEmail', obj)
            .map(res => {
                return res;
            });
    }

    isAccept(obj){
        return this.http.post<any>(appConfig.apiUrl + '/email/isAccept', obj)
        .map(res => {
            return res;
        });
    }

    getAllVenueProviders() {
        return this.http.get<any>(appConfig.apiUrl + '/user/getAllVanueProviders')
            .map(res => {
                return res;
            });
    }

    getAllRegisterdUsers() {
        return this.http.get<any>(appConfig.apiUrl + '/user/getAllRegisterdUsers')
            .map(res => {
                return res;
            });
    }


    deleteUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/delete', user)
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

    getEmails() {
        return this.http.get<any>(appConfig.apiUrl + '/email/getAllInboxEmailByUser')
            .map(res => {
                return res;
            });
    }

    getUnReadEmails() {
        return this.http.get<any>(appConfig.apiUrl + '/email/getUnReadEmails')
            .map(res => {
                return res;
            });
    }

    getSentEmails() {
        return this.http.get<any>(appConfig.apiUrl + '/email/getAllSentEmailByUser')
            .map(res => {
                return res;
            });
    }

    getUsersEmailWithAccept (){
        return this.http.get<any>(appConfig.apiUrl + '/email/getUsersEmailWithAccept')
            .map(res => {
                return res;
            });
    }

    // activeInactiveUser(user) {
    //     return this.http.post<any>(appConfig.apiUrl + '/user/activeInactiveUser', user)
    //         .map(res => {
    //             return res;
    //         });
    // }

    updateUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/updateUser', user)
            .map(res => {
                return res;
            });
    }

    updateProfile(user) {
        return this.http.post<any>(appConfig.apiUrl + '/user/updateProfile', user)
            .map(res => {
                return res;
            });
    }



    createUser(user) {
        return this.http.post<any>(appConfig.apiUrl + '/auth/register', user)
            .map(res => {
                return res;
            });
    }

    // sendemail(user) {
    //     return this.http.post<any>(appConfig.apiUrl + '/user/sendMultipleEmail', user)
    //         .map(res => {
    //             return res;
    //         });
    // }

    // getLoggedInUser() {
    //     return this.http.get<any>(appConfig.apiUrl + '/user/getUser')
    //         .map(res => {
    //             return res;
    //         });
    // }
}
