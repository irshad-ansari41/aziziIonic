import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment as ENV} from '../../environment';

/*
  Generated class for the PropertyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

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


        return this.http.get(ENV.BASE_URL + '/dubai', {});
    }


    getPropertyCommunities(area: Area) {
        let slug = area.slug;
        return this.http.get(ENV.BASE_URL + '/dubai/' + slug);
    }

    getProperties(area: Area) {
        let slug = area.slug;
        if (slug == 'riviera' || slug == 'victoria') {
            return this.http.get(ENV.BASE_URL + '/dubai/meydan/' + slug);
        }
        return this.http.get(ENV.BASE_URL + '/dubai/' + slug);
    }

    getProperty(property: Property) {
        let area = property.area_slug;
        let slug = property.slug;
        return this.http.get(ENV.BASE_URL + '/dubai/' + area + '/' + slug);
    }


    getContrcutionProjects() {
        return this.http.get(ENV.BASE_URL + '/dubai/construction-updates');
    }

    getConstructionCommunities(area: Area) {
        let slug = area.slug;
        return this.http.get(ENV.BASE_URL + '/dubai/' + slug + '/construction-updates');
    }

    getConstructions(area: Area) {
        let slug = area.slug;
        if (slug == 'riviera' || slug == 'victoria') {
            return this.http.get(ENV.BASE_URL + '/dubai/meydan/' + slug + '/construction-updates');
        }
        return this.http.get(ENV.BASE_URL + '/dubai/' + slug + '/construction-updates');

    }

    getConstruction(property: Property) {
        let area = property.area_slug;
        let slug = property.slug;
        return this.http.get(ENV.BASE_URL + '/dubai/' + area + '/' + slug + '/construction-updates');
    }

    getBrouchures() {
        return this.http.get(ENV.BASE_URL + '/properties/brochures');
    }

    getFloorplans() {
        return this.http.get(ENV.BASE_URL + '/properties/floorplans');
    }

    getVideoGalleries() {
        return this.http.get(ENV.BASE_URL + '/videos');
    }

    getImageGalleries() {
        return this.http.get(ENV.BASE_URL + '/image-galleries');
    }

    getEvents() {
        return this.http.get(ENV.BASE_URL + '/events');
    }

}
