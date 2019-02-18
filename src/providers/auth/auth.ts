import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


export class User {
    id?: number;
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    status?: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Lead {
    name: string;
    email: string;
    stay: string;
    nationality: string;
    country: string;
    country_code: string;
    phone: string;
    gender: string;
    age: string;
    source: string;
    user_id?: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


@Injectable()
export class AuthProvider {

    currentUser: User;
    baseUrl: string = "http://azizidevelopments.in";

    constructor(public httpClient: HttpClient) {
        console.log('Hello AuthProvider Provider');
    }

    public login(user: User): Observable<User> {

        return this.httpClient
            .post(this.baseUrl + '/api/v1/signin', user)
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


    public createLead(lead: Lead): Observable<Lead> {
        return this.httpClient
            .post(this.baseUrl + '/api/v1/send-lead', lead)
            .map(response => {
                return new Lead(response);
            });

    }


}
