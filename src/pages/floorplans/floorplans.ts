import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {PropertyProvider} from '../../providers/property/property';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {environment as ENV} from '../../environment';

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
    downloadFile: string = '';

    constructor(
        public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        private propertyProvider: PropertyProvider,
        private document: DocumentViewer,
        private platform: Platform,
        private file: File,
        private transfer: FileTransfer,
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
            content: ENV.LoadingMsg
        });
        allFloorplansLoadingController.present();

        let retrievedObject = JSON.parse(localStorage.getItem('floorplans'));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.floorplans = retrievedObject;
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
        let browser = this.iab.create(url);
        browser.close();
    }

    openLocalPdf(fileUrl: string) {

        this.downloadFile = fileUrl;
        let urlSegment = fileUrl.split('/');
        let filenName = urlSegment[urlSegment.length - 1].replace(/ /g, '-');
        let path = null;

        if (this.platform.is('ios')) {
            path = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
            path = this.file.dataDirectory;
        } else if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.openPdf(fileUrl);
            return;
        }

        this.file.checkFile(path, filenName).then(
            (files) => {
                //console.log("files found" + files);
                const options: DocumentViewerOptions = {
                    title: filenName
                }
                this.document.viewDocument(path + filenName, 'application/pdf', options, this.onShow, this.onClose, this.onMissingApp, this.onError);
            }
        ).catch(
            (err) => {
                console.log("files not found in device, Please download fist time.", err)
                alert("File not found in device, Please download fist time.");
                this.downloadAndOpenPdf(this.downloadFile);
            }
        );
    }


    downloadAndOpenPdf(fileUrl: string) {
        let allPropertyLoadingController = this.loadingController.create({
            content: ENV.LoadingMsg
        });
        allPropertyLoadingController.present();

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
            allPropertyLoadingController.dismiss();
            this.openLocalPdf(fileUrl);
        }, (error) => {
            console.log(error);
        });
    }

    onPossible() {
        console.log('document can be shown');
    }

    onMissingApp(appId, installer) {
        if (confirm("Please install the free PDF Viewer App "
            + appId + " for Android?")) {
            installer();
        }
    }

    onImpossible() {
        console.log('document cannot be shown');
    }

    onError(error) {
        console.log('document shown', error);
    }

    onShow() {
        console.log('document shown');
    }

    onClose() {
        console.log('document closed');
    }
}