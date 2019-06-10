import {Component} from '@angular/core';
import {IonicPage, Nav, Platform, NavController, NavParams, AlertController} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {SocialSharing} from '@ionic-native/social-sharing';

import {HomePage} from '../home/home';
import {ContactPage} from '../contact/contact';
import {environment as ENV} from '../../environment';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-more',
    templateUrl: 'more.html',
})
export class MorePage {

    public store: string;
    public storeUrl: string;

    public appVesrion = ENV.APP_VERSION;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private iab: InAppBrowser,
        private alertCtrl: AlertController,
        private platform: Platform,
        private socialSharing: SocialSharing
    ) {

        if (this.platform.is('ios')) {
            this.store = 'App Store';
            this.storeUrl = "https://itunes.apple.com/us/app/azizi-developments/id1287021117?ls=1&mt=8";
        }
        if (this.platform.is('android')) {
            this.store = 'Play Store';
            this.storeUrl = "https://play.google.com/store/apps/details?id=com.azizi.developments";
        }
    }

    openHomePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(MorePage);
    }

    openContactPage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(ContactPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MorePage');
    }

    openExternalUrl(url: string, ) {
        let browser = this.iab.create(url);
        browser.close();
    }

    CacheClear() {
        const confirm = this.alertCtrl.create({
            title: 'Clear Confirmation',
            message: 'Are you sure you want to clear?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        var user = localStorage.getItem('User');
                        localStorage.clear();
                        localStorage.setItem('User', user);
                        console.log('Yes');
                    }
                }
            ]
        });
        confirm.present();
    }

    shareApp() {
        let options = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: '', // fi. for email
            files: '', // an array of filenames either locally or remotely
            url: this.storeUrl,
            chooserTitle: '' // Android only, you can override the default share sheet title
        };
        this.socialSharing.shareWithOptions(options).then(() => {
            // Success!
        }).catch(() => {
            // Error!
        });;

    }

    rateApp() {
        const confirm = this.alertCtrl.create({
            title: 'Rate Confirmation',
            message: 'Are you sure you want to rate us?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        let browser = this.iab.create(this.storeUrl);
                        browser.close();
                    }
                }
            ]
        });
        confirm.present();
    }

    syncApp() {
        console.log('Sync App...');
    }

    viewOnWeb() {
        const confirm = this.alertCtrl.create({
            title: 'Open Confirmation',
            message: 'Are you sure you want to open in browser?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        let browser = this.iab.create("https://azizidevelopments.com/app");
                        browser.close();
                    }
                }
            ]
        });
        confirm.present();
    }

}
