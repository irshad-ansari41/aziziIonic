import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, Platform, LoadingController, ModalController } from 'ionic-angular';
import { PropertyProvider, Property } from '../../providers/property/property';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GalleryModal } from 'ionic-gallery-modal';

//import {DomSanitizer} from '@angular/platform-browser';

import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { HomePage } from '../home/home';
import { MorePage } from '../more/more';
import { MapPage } from '../map/map';
import { ConstructionDetailsPage } from '../construction-details/construction-details';
import { ViewVideoPage } from '../view-video/view-video';

import { environment as ENV } from '../../environment';

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

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    downloadFile: string = '';


    public property: object = [];

    public options = {
        share: true, // default is false
        closeButton: false, // default is true
        copyToReference: true // default is false
    };


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
        private modalController: ModalController,
        private iab: InAppBrowser,
        //private sanitizer: DomSanitizer
    ) {


    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    openMapPage(lat: number, lng: number) {
        this.navCtrl.push(MapPage, { lat: lat, lng: lng });
    }

    openVideoPage(url: string) {
        this.navCtrl.push(ViewVideoPage, { url: url });
    }

    openConstructionUpdatePage(constructionId: number) {
        this.navCtrl.push(ConstructionDetailsPage, { constructionId: constructionId, });
    }

    ionViewDidLoad() {
        let property = this.navParams.get('property');
        this.getProperty(property);
        console.log('ionViewDidLoad PropertyPage');
    }

    getProperty(property: Property) {
        let allPropertyLoadingController = this.loadingController.create({
            content: ENV.LoadingMsg
        });
        allPropertyLoadingController.present();

        let key = 'property_' + property.id;
        let retrievedObject = JSON.parse(localStorage.getItem(key));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.property = retrievedObject;
            allPropertyLoadingController.dismiss();
        } else {
            this.propertyProvider.getProperty(property).subscribe((property) => {
                this.property = property;
                localStorage.setItem(key, JSON.stringify(property));
                allPropertyLoadingController.dismiss();
            });
        }
    }

    open360viewPage(url: string, ) {
        let browser = this.iab.create(url);
        browser.close();
    }

    openPdf(url: string) {
        let browser = this.iab.create(url);
        browser.close();
    }

    openGallery(images) {
        let photos = [];
        for (let i = 0; i < images.length; i++) {
            photos.push({ url: images[i], 'type': 'none' });
        }
        console.log(photos);
        let modal = this.modalController.create(GalleryModal, {
            photos: photos,
            closeIcon: 'close',
            initialSlide: 0,
        });
        modal.present();
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
                console.log("files not found in device, Please download fist time.", err);
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