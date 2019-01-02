import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PropertyProvider} from '../../providers/property/property';

import {PropertyPage} from '../property/property';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public areas: object = [];
    public propertyPage=PropertyPage;

    constructor(public navCtrl: NavController, private propertyProvider: PropertyProvider) {
        this.getArea();

    }

    getArea() {
        this.propertyProvider.getProjects().subscribe((areas) => {
            this.areas = areas;
            console.log(areas);
        });

    }
    
     openPropertyPage(area) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertyPage,{area:area});
    }
    
    openCommunityPage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(PropertyPage);
    }



}
