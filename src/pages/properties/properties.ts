import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property'

import {PropertyPage} from '../property/property';
import {HomePage} from '../home/home';

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

    constructor(public navCtrl: NavController,
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
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(HomePage);
    }

    getProperties(areaId: number, communityId: number) {
        let allPropertiesLoadingController = this.loadingController.create({
            content: "getting your data from server"
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
