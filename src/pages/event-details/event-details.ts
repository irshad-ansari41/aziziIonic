import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
/**
 * Generated class for the EventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-details',
    templateUrl: 'event-details.html',
})
export class EventDetailsPage {

    public event: object = [];

    constructor(
        public nav: Nav,
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
        this.event = this.navParams.get('event');
        console.log('ionViewDidLoad EventDetailsPage');
    }


    openRsvpPage() {

    }

}
