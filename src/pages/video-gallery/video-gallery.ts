import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

import {PropertyProvider} from '../../providers/property/property';
import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {Constants} from '../../enum';
 
/**
 * Generated class for the VideoGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-video-gallery',
    templateUrl: 'video-gallery.html',
})
export class VideoGalleryPage {

    public pet: string = "Commercial";
    public galleries: object = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private propertyProvider: PropertyProvider,
        private loadingController: LoadingController,
        private sanitizer: DomSanitizer) {
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }
    
    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    ionViewDidLoad() {
        this.getVideoGalleries();
        console.log('ionViewDidLoad VideoGalleryPage');
    }

    getVideoGalleries() {
        let allGalleriesLoadingController = this.loadingController.create({
            content: Constants.LoadingMsg
        });
        allGalleriesLoadingController.present();

        let retrievedObject = JSON.parse(localStorage.getItem('videos'));
        if (typeof retrievedObject !== 'undefined' && retrievedObject !== null) {
            this.galleries = retrievedObject;
            allGalleriesLoadingController.dismiss();
        } else {
            this.propertyProvider.getVideoGalleries().subscribe((floorplans) => {
                this.galleries = floorplans;
                console.log(this.galleries);
                localStorage.setItem('videos', JSON.stringify(floorplans));
                allGalleriesLoadingController.dismiss();
            });
        }
    }

    generateVideoUrl(videoId: string) {
        let url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoId + "?rel=0&loop=1&playlist=" + videoId + "&showinfo=0");
        return url;
    }

}
