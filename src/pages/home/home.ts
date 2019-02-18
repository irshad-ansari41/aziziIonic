import {Component} from '@angular/core';
import {Nav, NavController, LoadingController} from 'ionic-angular';
import {PropertyProvider, Area} from '../../providers/property/property';

import {PropertiesPage} from '../properties/properties';
import {CommunityPage} from '../community/community';
import {MorePage} from '../more/more';
import {Constants} from '../../enum';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public areas: object = [];

    constructor(public nav: Nav, public navCtrl: NavController, private propertyProvider: PropertyProvider, private loadingController: LoadingController, ) {
        this.getProjects();
    }

    getProjects() {
        let allAreasLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allAreasLoadingController.present();

        let retrievedObject = JSON.parse(localStorage.getItem('areas'));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.areas = retrievedObject;
            allAreasLoadingController.dismiss();
        } else {
            this.propertyProvider.getProjects().subscribe((areas) => {
                this.areas = areas;
                localStorage.setItem('areas', JSON.stringify(areas));
                allAreasLoadingController.dismiss();
            });
        }
    }

    openPropertiesPage(area: Area) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertiesPage, {area: area});
    }

    openCommunityPage(area: Area) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(CommunityPage, {area: area, listType: 'property'});
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }





}
