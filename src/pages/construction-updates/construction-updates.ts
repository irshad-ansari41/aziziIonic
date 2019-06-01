import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {ConstructionsPage} from '../constructions/constructions';
import {CommunityPage} from '../community/community';

import {environment as ENV} from '../../environment';

/**
 * Generated class for the ConstructionUpdatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-construction-updates',
    templateUrl: 'construction-updates.html',
})
export class ConstructionUpdatesPage {

    public areas: object = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController, ) {
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    openConstructionsPage(area: any) {

        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(ConstructionsPage, {area: area});
    }

    openCommunityPage(area: any) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(CommunityPage, {area: area, listType: 'construction'});
    }

    getProjects() {
        let allAreasLoadingController = this.loadingController.create({
            content: ENV.LoadingMsg
        });
        allAreasLoadingController.present();

        let retrievedObject = JSON.parse(localStorage.getItem('construction_areas'));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.areas = retrievedObject;
            allAreasLoadingController.dismiss();
        } else {
            this.propertyProvider.getContrcutionProjects().subscribe((areas) => {
                this.areas = areas;
                localStorage.setItem('construction_areas', JSON.stringify(areas));
                allAreasLoadingController.dismiss();
            });
        }

    }

    ionViewDidLoad() {
        this.getProjects();
        console.log('ionViewDidLoad ConstructionUpdatesPage');
    }


}
