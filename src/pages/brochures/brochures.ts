import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';

import {InAppBrowser} from '@ionic-native/in-app-browser';
//import {NativeStorage} from '@ionic-native/native-storage/ngx';

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
        //private nativeStorage: NativeStorage,
        private iab: InAppBrowser,
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

    openPdf(url: string) {
        let browser = this.iab.create(url);
        browser.close();
    }

    openLocalPdf(fileUrl: string) {

        let urlSegment = fileUrl.split('/');
        let filenName = urlSegment[urlSegment.length - 1].replace(/ /g, '-');
        let path = null;

        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }

        const options: DocumentViewerOptions = {
            title: filenName
        }
        this.document.viewDocument(path + filenName, 'application/pdf', options);
    }


    download(fileUrl: string) {

        let urlSegment = fileUrl.split('/');
        let filenName = urlSegment[urlSegment.length - 1].replace(/ /g, '-');
        let path = null;

        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        }
        console.log(path + filenName);

        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.download(fileUrl, path + filenName).then((entry) => {
            console.log('download complete: ' + entry.toURL());
        }, (error) => {
            // handle error
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
