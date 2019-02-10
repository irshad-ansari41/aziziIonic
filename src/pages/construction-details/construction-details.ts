import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';


import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {Constants} from '../../enum';

/**
 * Generated class for the ConstructionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
    selector: 'page-construction-details',
    templateUrl: 'construction-details.html',
})

export class ConstructionDetailsPage {

    public construction: object = [];
    public script: any;

    constructor(public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController ) {
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    

    ionViewDidLoad() {
       
        let property = this.navParams.get('property');
        this.getConstruction(property);
        console.log('ionViewDidLoad ConstructionDetailsPage');
    }

    getConstruction(property: any) {
        let allPropertyLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertyLoadingController.present();
        let retrievedObject = localStorage.getItem('construction_' + property.id);
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.construction = JSON.parse(retrievedObject);
            allPropertyLoadingController.dismiss();
        } else {
            this.propertyProvider.getConstruction(property).subscribe((construction) => {
                this.construction = construction;
                localStorage.setItem('construction_' + property.id, JSON.stringify(construction));
                allPropertyLoadingController.dismiss();
            });
        }
    }

}
