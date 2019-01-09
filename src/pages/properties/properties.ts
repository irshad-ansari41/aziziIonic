import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property'

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

    public area: any = [];
    public properties: object = [];

    constructor(public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }

    ionViewDidLoad() {
        this.area = this.navParams.get('area');
        this.getProperties(this.area['value']['id'], this.area['value']['community_id']);
        console.log('ionViewDidLoad PropertiesPage');
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    getProperties(areaId: number, communityId: number) {
        let allPropertiesLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertiesLoadingController.present();

        let key = 'properties_' + areaId + '_' + communityId;
        let retrievedObject = localStorage.getItem(key);
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.properties = JSON.parse(retrievedObject);
            allPropertiesLoadingController.dismiss();
        } else {
            this.propertyProvider.getProperties(areaId, communityId).subscribe((properties) => {
                this.properties = properties;
                localStorage.setItem(key, JSON.stringify(properties));
                allPropertiesLoadingController.dismiss();
            });
        }


    }

    openPropertyPage(property: object) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertyPage, {property: property});
    }


}
