import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the PropertyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "http://azizidevelopments.in/api/v1";
const API_: string = "https://azizidevelopments.com/api";

export interface Area {
    id?: number,
    slug?: string;
    name?: string;
    area_slug?: string;
}
export interface Property {
    id?: number,
    slug?: string;
    name?: string;
    area_slug?: string;
}



@Injectable()

export class PropertyProvider {

    constructor(public http: HttpClient) {
        console.log('Hello PropertyProvider Provider');
    }

    getProjects() {
        return this.http.get(API_ + '/dubai');
    }

    getPropertyCommunities(area: Area) {
        let slug = area.slug;
        return this.http.get(API_ + '/dubai/' + slug);
    }

    getProperties(area: Area) {
        let slug = area.slug;
        if (slug == 'riviera' || slug == 'victoria') {
            return this.http.get(API_ + '/dubai/meydan/' + slug);
        }
        return this.http.get(API_ + '/dubai/' + slug);
    }

    getProperty(property: Property) {
        let area = property.area_slug;
        let slug = property.slug;
        return this.http.get(API_ + '/dubai/' + area + '/' + slug);
    }


    getContrcutionProjects() {
        return this.http.get(API_ + '/dubai/construction-updates');
    }

    getConstructionCommunities(area: Area) {
        let slug = area.slug;
        return this.http.get(API_ + '/dubai/' + slug + '/construction-updates');
    }

    getConstructions(area: Area) {
        let slug = area.slug;
        if (slug == 'riviera' || slug == 'victoria') {
            return this.http.get(API_ + '/dubai/meydan/' + slug + '/construction-updates');
        }
        return this.http.get(API_ + '/dubai/' + slug + '/construction-updates');

    }

    getConstruction(property: Property) {
        let area = property.area_slug;
        let slug = property.slug;
        return this.http.get(API_ + '/dubai/' + area + '/' + slug + '/construction-updates');
    }

    getBrouchures() {
        return this.http.get(API_ + '/properties/brochures');
    }

    getFloorplans() {
        return this.http.get(API_ + '/properties/floorplans');
    }

    getVideoGalleries() {
        return this.http.get(API + '/video-galleries');
    }

    getImageGalleries() {
        return this.http.get(API + '/image-galleries');
    }

    getEvents() {
        return this.http.get(API_ + '/events');
    }

    getCountries() {
        return this.http.get('../assets/data/countries.json');
    }

    getAges() {
        return this.http.get('../assets/data/ages.json');
    }



}
