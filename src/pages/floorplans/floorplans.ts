import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer} from '@ionic-native/file-transfer';
import {InAppBrowser} from '@ionic-native/in-app-browser';
//import {NativeStorage} from '@ionic-native/native-storage/ngx';

import {PropertyProvider} from '../../providers/property/property';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {Constants} from '../../enum';

/**
 * Generated class for the FloorplansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-floorplans',
    templateUrl: 'floorplans.html',
})
export class FloorplansPage {

    public floorplans: object = [];

    constructor(
        public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private document: DocumentViewer,
        private platform: Platform,
        private file: File,
        private transfer: FileTransfer,
        //private nativeStorage: NativeStorage,
        private iab: InAppBrowser,
        private loadingController: LoadingController, ) {

    }


    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    ionViewDidLoad() {
        this.getFloorplans();
        console.log('ionViewDidLoad FloorplansPage');
    }

    getFloorplans() {
        let allFloorplansLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allFloorplansLoadingController.present();

        let retrievedObject = localStorage.getItem('floorplans');
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.floorplans = JSON.parse(retrievedObject);
            allFloorplansLoadingController.dismiss();
        } else {
            this.propertyProvider.getFloorplans().subscribe((floorplans) => {
                this.floorplans = floorplans;
                console.log(this.floorplans);
                localStorage.setItem('floorplans', JSON.stringify(floorplans));
                allFloorplansLoadingController.dismiss();
            });
        }
    }

    openPdf(url: string) {
        console.log(url);
        let browser = this.iab.create(url);
        browser.close();
    }

    openLocalPdf() {
        const options: DocumentViewerOptions = {
            title: 'My PDF'
        }
        this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
    }

    downloadAndOpenPdf(pdfUrl: string) {
        let urlSegment = pdfUrl.split('/');
        let filenName = urlSegment[urlSegment.length - 1];
        let path = null;

        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }

        const transfer = this.transfer.create();
        transfer.download(pdfUrl, path + filenName).then(entry => {
            let url = entry.toURL();
            this.document.viewDocument(url, 'application/pdf', {});
        });
        console.log(pdfUrl);
    }
}