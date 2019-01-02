import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the PropertyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "http://azizidevelopments.in/api/v1";

@Injectable()
export class PropertyProvider {

    constructor(public http: HttpClient) {
        console.log('Hello PropertyProvider Provider');
    }

    getProjects() {
        return this.http.get(API + '/properties/areas');
         console.log('Hello PropertyProvider Provider');
    }
    
    getProperties() {
        return this.http.get(API + '/properties/areas');
    }


}
