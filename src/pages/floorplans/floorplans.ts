import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer} from '@ionic-native/file-transfer';

import {PropertyProvider} from '../../providers/property/property';
import {HomePage} from '../home/home';

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
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private document: DocumentViewer,
        private platform: Platform,
        private file: File,
        private transfer: FileTransfer,
        private loadingController: LoadingController,
    ) {


    }

    ionViewDidLoad() {
        this.getFloorplans();
        console.log('ionViewDidLoad FloorplansPage');
    }

    getFloorplans() {
        let allFloorplansLoadingController = this.loadingController.create({
            content: "getting your data from server"
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
    
    openLocalPdf() {
        const options: DocumentViewerOptions = {
            title: 'My PDF'
        }
        this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
    }

    downloadAndOpenPdf(pdfUrl) {
        let path = null;

        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }

        const transfer = this.transfer.create();
        transfer.download(pdfUrl, path + 'myfile.pdf').then(entry => {
            let url = entry.toURL();
            this.document.viewDocument(url, 'application/pdf', {});
        });
        console.log(pdfUrl);
    }

    onPossible() {

    }
    onMissingApp() {

    }
    onImpossible() {

    }
    onError() {

    }


}
