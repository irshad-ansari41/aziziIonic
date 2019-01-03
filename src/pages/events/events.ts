import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import {PropertyProvider} from '../../providers/property/property';

import {HomePage} from '../home/home';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-events',
    templateUrl: 'events.html',
})
export class EventsPage {

    public events: object = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }

    ionViewDidLoad() {
        this.getEvents();
        console.log('ionViewDidLoad EventsPage');
    }

    openHomePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(HomePage);
    }

    getEvents() {
        let allEventsLoadingController = this.loadingController.create({
            content: "getting your data from server"
        });
        allEventsLoadingController.present();

        let retrievedObject = localStorage.getItem('events');
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.events = JSON.parse(retrievedObject);
            allEventsLoadingController.dismiss();
        } else {
            this.propertyProvider.getAreas().subscribe((events) => {
                this.events = events;
                localStorage.setItem('events', JSON.stringify(events));
                allEventsLoadingController.dismiss();
            });
        }
    }
}
