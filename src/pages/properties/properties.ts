import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider,Area} from '../../providers/property/property'

import {PropertyPage} from '../property/property';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {Constants} from '../../enum';

/**
 * Generated class for the PropertiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-properties',
    templateUrl: 'properties.html',
})
export class PropertiesPage {

    public areaName: string;
    public properties: object = [];

    constructor(public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }

    ionViewDidLoad() {
        let area:Area = this.navParams.get('area');
        this.getProperties(area);
        this.areaName = area.name;
        console.log('ionViewDidLoad PropertiesPage');
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    getProperties(area:Area) {
        let allPropertiesLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertiesLoadingController.present();

        let key = 'properties_' + area.id;
        let retrievedObject = JSON.parse(localStorage.getItem(key));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.properties = retrievedObject;
            allPropertiesLoadingController.dismiss();
        } else {
            this.propertyProvider.getProperties(area).subscribe((properties) => {
                this.properties = properties;
                localStorage.setItem(key, JSON.stringify(properties));
                allPropertiesLoadingController.dismiss();
            });
        }


    }

    openPropertyPage(property: any) {
        
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertyPage, {property: property});
    }


}
