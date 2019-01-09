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

    getAreas() {
        return this.http.get(API + '/properties/areas');
    }

    getCommunity(areaId: number) {
        return this.http.get(API + '/properties/communities/' + areaId);
    }

    getProperties(areaId: number, communityId: number) {
        return this.http.get(API + '/properties/' + areaId + '/' + communityId);
    }

    getProperty(propertyId: number) {
        return this.http.get(API + '/properties/' + propertyId);
    }

    getBrouchures() {
        return this.http.get(API + '/properties/brochures');
    }

    getFloorplans() {
        return this.http.get(API + '/properties/floorplans');
    }

    getVideoGalleries() {
        return this.http.get(API + '/video-galleries');
    }

    getImageGalleries() {
        return this.http.get(API + '/image-galleries');
    }

    getCountries() {
        return this.http.get('../assets/data/countries.json');
    }
    getAges() {
        return this.http.get('../assets/data/ages.json');
    }

}
