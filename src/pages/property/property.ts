import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';

import {HomePage} from '../home/home';


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

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }

    openHomePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(HomePage);
    }

    ionViewDidLoad() {
        this.property = this.navParams.get('property');
        this.getProperty(this.property['value']['id']);
        console.log('ionViewDidLoad PropertyPage');
    }


    getProperty(PropertyId: number) {
        let allPropertyLoadingController = this.loadingController.create({
            content: "getting your data from server"
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
