import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform, LoadingController, ModalController} from 'ionic-angular';
import {PropertyProvider, Property} from '../../providers/property/property';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GalleryModal} from 'ionic-gallery-modal';

//import {DomSanitizer} from '@angular/platform-browser';

import {File} from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileTransfer} from '@ionic-native/file-transfer';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {MapPage} from '../map/map';
import {ConstructionDetailsPage} from '../construction-details/construction-details';
import {ViewVideoPage} from '../view-video/view-video';

import {Constants} from '../../enum';

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
        this.navCtrl.push(MapPage, {lat: lat, lng: lng});
    }

    openVideoPage(url: string) {
        this.navCtrl.push(ViewVideoPage, {url: url});
    }

    openConstructionUpdatePage(constructionId: number) {
        this.navCtrl.push(ConstructionDetailsPage, {constructionId: constructionId, });
    }

    open360viewPage(url: string, ) {
        let browser = this.iab.create(url);

        //browser.executeScript('')

        //browser.insertCSS(...);

        //browser.on('loadstop').subscribe(event => {
        //    browser.insertCSS({code: "body{color: red;"});
        //});

        browser.close();
    }


    ionViewDidLoad() {
        let property = this.navParams.get('property');
        this.getProperty(property);
        console.log('ionViewDidLoad PropertyPage');
    }


    getProperty(property: Property) {
        let allPropertyLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
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

    openPdf(url: string) {
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
    }

    openGallery(images) {
        let photos = [];
        for (let i = 0; i < images.length; i++) {
            photos.push({url: images[i], 'type': 'none'});
        }
        console.log(photos);
        let modal = this.modalController.create(GalleryModal, {
            photos: photos,
            closeIcon: 'close',
            initialSlide: 0,
        });
        modal.present();
    }



}
