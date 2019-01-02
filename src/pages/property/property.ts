import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-property',
    templateUrl: 'property.html',
})
export class PropertyPage {

    public area: object = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.area = this.navParams.get('area');
        console.log(this.area);
        console.log('ionViewDidLoad PropertyPage');
    }

}
