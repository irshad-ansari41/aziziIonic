import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';

import {PropertyProvider} from '../../providers/property/property';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {EventDetailsPage} from '../event-details/event-details';

import {environment as ENV} from '../../environment';

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

    constructor(
        public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }

    ionViewDidLoad() {
        this.getEvents();
        console.log('ionViewDidLoad EventsPage');
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    getEvents() {
        let allEventsLoadingController = this.loadingController.create({
            content: ENV.LoadingMsg
        });
        allEventsLoadingController.present();

        let retrievedObject = JSON.parse(localStorage.getItem('events'));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.events = retrievedObject;
            allEventsLoadingController.dismiss();
        } else {
            this.propertyProvider.getEvents().subscribe((events) => {
                this.events = events;
                localStorage.setItem('events', JSON.stringify(events));
                allEventsLoadingController.dismiss();
            });
        }
    }
    
    openEventDetailPage(event:object){
        this.navCtrl.push(EventDetailsPage,{event:event});
    }
}
