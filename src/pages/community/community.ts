import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';

import {PropertiesPage} from '../properties/properties';
import {ConstructionsPage} from '../constructions/constructions';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {Constants} from '../../enum';
/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-community',
    templateUrl: 'community.html',
})
export class CommunityPage {

    public communities: object = [];
    public listType: string;

    constructor(public nav: Nav,
        public navCtrl: NavController, public navParams: NavParams,
        private loadingController: LoadingController,
        private propertyProvider: PropertyProvider,
    ) {
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    ionViewDidLoad() {
        let listType = this.navParams.get('listType');
        let area = this.navParams.get('area');

        this.listType = listType;

        if (listType == 'property') {
            this.getPropertyCommunities(area);
        }
        if (listType == 'construction') {
            this.getConstructionCommunities(area);
        }

        console.log('ionViewDidLoad CommunityPage');
    }

    getPropertyCommunities(area: any) {
        let allPropertiesLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertiesLoadingController.present();

        let key = 'property_communities_' + area.id;
        let retrievedObject = JSON.parse(localStorage.getItem(key));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.communities = retrievedObject;
            allPropertiesLoadingController.dismiss();
        } else {
            this.propertyProvider.getPropertyCommunities(area).subscribe((constructions) => {
                this.communities = constructions;
                localStorage.setItem(key, JSON.stringify(constructions));
                allPropertiesLoadingController.dismiss();
            });
        }
    }

    getConstructionCommunities(area: any) {
        let allPropertiesLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allPropertiesLoadingController.present();

        let key = 'constructions_communities_' + area.id;
        let retrievedObject = JSON.parse(localStorage.getItem(key));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.communities = retrievedObject;
            allPropertiesLoadingController.dismiss();
        } else {
            this.propertyProvider.getConstructionCommunities(area).subscribe((constructions) => {
                this.communities = constructions;
                localStorage.setItem(key, JSON.stringify(constructions));
                allPropertiesLoadingController.dismiss();
            });
        }
    }

    openPropertiesPage(community: object) {

        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertiesPage, {area: community});
    }

    openConstructionsPage(community: object) {

        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(ConstructionsPage, {area: community});
    }

}
