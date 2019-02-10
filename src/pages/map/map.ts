import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';


import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {

    @ViewChild('map') mapElement: ElementRef;

    public map: any;

    constructor(public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams, ) {
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    ionViewDidLoad() {
        let lat = this.navParams.get('lat');
        let lng = this.navParams.get('lng');
        this.loadGoogleMap(lat, lng);
        console.log('ionViewDidLoad MapPage');
    }

    loadGoogleMap(lat: number, lng: number) {
        let latLng = new google.maps.LatLng(lat, lng);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    }

}
