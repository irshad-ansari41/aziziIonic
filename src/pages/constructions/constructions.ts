import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider,Area} from '../../providers/property/property'

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {ConstructionDetailsPage} from '../construction-details/construction-details';

import {Constants} from '../../enum';
/**
 * Generated class for the ConstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-constructions',
    templateUrl: 'constructions.html',
})
export class ConstructionsPage {

    public areaName: any = [];
    public constructions: object = [];

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
        let area:Area = this.navParams.get('area');
        this.getConstructions(area);
        this.areaName=area.name;
        console.log('ionViewDidLoad ConstructionsPage');
    }

    getConstructions(area: Area) {
        let allPropertiesLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertiesLoadingController.present();

        let key = 'constructions_' + area.slug;
        let retrievedObject = JSON.parse(localStorage.getItem(key));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.constructions = retrievedObject;
            allPropertiesLoadingController.dismiss();
        } else {
            this.propertyProvider.getConstructions(area).subscribe((constructions) => {
                this.constructions = constructions;
                localStorage.setItem(key, JSON.stringify(constructions));
                allPropertiesLoadingController.dismiss();
            });
        }


    }

    openConstructionDetailsPage(property: any) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(ConstructionDetailsPage, {property: property});
    }

}
