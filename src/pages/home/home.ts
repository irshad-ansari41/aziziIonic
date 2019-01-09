import {Component} from '@angular/core';
import {Nav, NavController, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';

import {PropertiesPage} from '../properties/properties';
import {CommunityPage} from '../community/community';
import {MorePage} from '../more/more';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public areas: object = [];

    constructor(public nav: Nav, public navCtrl: NavController, private propertyProvider: PropertyProvider, private loadingController: LoadingController, ) {
        this.getAreas();
    }

    getAreas() {
        let allAreasLoadingController = this.loadingController.create({
            content: "getting your data from server"
        });
        allAreasLoadingController.present();

        let retrievedObject = localStorage.getItem('areas');
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.areas = JSON.parse(retrievedObject);
            allAreasLoadingController.dismiss();
        } else {
            this.propertyProvider.getAreas().subscribe((areas) => {
                this.areas = areas;
                localStorage.setItem('areas', JSON.stringify(areas));
                allAreasLoadingController.dismiss();
            });
        }
    }

    openPropertiesPage(area: object) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertiesPage, {area: area});
    }

    openCommunityPage(area: object) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(CommunityPage, {area: area});
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }





}
