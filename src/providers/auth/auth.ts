import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../../class/user'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API_BASE_URL: string = "https://azizidevelopments.com/api";


@Injectable()
export class AuthProvider {

    currentUser: User;


    constructor(public httpClient: HttpClient) {
        console.log('Hello AuthProvider Provider');
    }

    public login(user: User): Observable<User> {

        return this.httpClient
            .post(API_BASE_URL + '/signin', user)
            .map(response => {
                return new User(response);
            });

    }



    public logout() {
        //        return Observable.create(observer => {
        //            this.currentUser = null;
        //            observer.next(true);
        //            observer.complete();
        //        });
    }








}
