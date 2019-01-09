import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer} from '@ionic-native/file-transfer';

import {PropertyProvider} from '../../providers/property/property';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {Constants} from '../../enum';
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
        public nav: Nav,
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


    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    ionViewDidLoad() {
        this.getBrouchures();
        console.log('ionViewDidLoad BrochuresPage');
    }


    getBrouchures() {

        let allBrochuresLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
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
