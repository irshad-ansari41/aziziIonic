import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {Constants} from '../../enum';

/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-property',
    templateUrl: 'property.html',
})
export class PropertyPage {

    public property: object = [];

    constructor(public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }


    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    ionViewDidLoad() {
        this.property = this.navParams.get('property');
        this.getProperty(this.property['value']['id']);
        console.log('ionViewDidLoad PropertyPage');
    }


    getProperty(PropertyId: number) {
        let allPropertyLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertyLoadingController.present();

        let retrievedObject = localStorage.getItem('property_' + PropertyId);
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.property = JSON.parse(retrievedObject);
            allPropertyLoadingController.dismiss();
        } else {
            this.propertyProvider.getProperty(PropertyId).subscribe((property) => {
                this.property = property;
                localStorage.setItem('property_' + PropertyId, JSON.stringify(property));
                allPropertyLoadingController.dismiss();
            });
        }
    }




}
