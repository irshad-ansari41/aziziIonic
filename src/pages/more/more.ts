import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import {HomePage} from '../home/home';
//import {Constants} from '../../enum';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-more',
    templateUrl: 'more.html',
})
export class MorePage {

    public appVesrion = '1.0.0';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,) {
    }

    openHomePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(MorePage);
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad MorePage');
    }

}
