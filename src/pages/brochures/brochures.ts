import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer} from '@ionic-native/file-transfer';

import {PropertyProvider} from '../../providers/property/property';
import {HomePage} from '../home/home';
/**
 * Generated class for the BrochuresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-brochures',
    templateUrl: 'brochures.html',
})



export class BrochuresPage {

    public brochures: object = [];
    //private contentType: string = 'application/pdf';


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
        this.getBrouchures();
        console.log('ionViewDidLoad BrochuresPage');
    }

    openHomePage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(HomePage);
    }


    getBrouchures() {

        let allBrochuresLoadingController = this.loadingController.create({
            content: "getting your data from server"
        });
        allBrochuresLoadingController.present();

        let retrievedObject = localStorage.getItem('brochures');
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.brochures = JSON.parse(retrievedObject);
            allBrochuresLoadingController.dismiss();
        } else {
            this.propertyProvider.getBrouchures().subscribe((brochures) => {
                this.brochures = brochures;
                console.log(this.brochures);
                localStorage.setItem('brochures', JSON.stringify(brochures));
                allBrochuresLoadingController.dismiss();
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
