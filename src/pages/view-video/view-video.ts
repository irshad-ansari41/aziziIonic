import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the ViewVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-view-video',
    templateUrl: 'view-video.html',
})
export class ViewVideoPage {

    public videoUrl: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    }

    ionViewDidLoad() {
        let url = this.navParams.get('url');
        let urlSegment = url.split('/');
        let videoId = urlSegment[4].replace('?rel=0','');
        console.log(videoId);
        this.videoUrl = this.generateVideoUrl(videoId);
        console.log('ionViewDidLoad ViewVideoPage');
    }

    generateVideoUrl(videoId: string) {
        let url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoId + "?rel=0&loop=1&playlist=" + videoId + "&showinfo=0");
        return url;
    }


}
