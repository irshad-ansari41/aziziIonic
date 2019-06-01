import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Lead } from '../../class/lead';
import { Contact } from '../../class/contact';
import {environment as ENV} from '../../environment';

/*
  Generated class for the LeadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class LeadProvider {

  constructor(public httpClient: HttpClient) {
    console.log('Hello LeadProvider Provider');
  }

  public createLead(lead: Lead): any {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'text/javascript');

    return this.httpClient
      .post(ENV.BASE_URL + '/create-lead', lead)
      .map((response) => {
        return response;
      });

  }


  public createContact(contact: Contact): any {

    return this.httpClient
      .post(ENV.BASE_URL + '/create-contact', contact)
      .map(response => {
        return response;
      });

  }

  getLeadCount() {
    return this.httpClient.get(ENV.BASE_URL + '/count-lead');
  }

  getLeadSource() {
    return this.httpClient.get(ENV.BASE_URL + '/get-kiosk-source');
  }


  getCountries() {
    return this.httpClient.get(ENV.BASE_URL + '/get-countries');
  }

  getAges() {
    return this.httpClient.get('../assets/data/ages.json');
  }

}
