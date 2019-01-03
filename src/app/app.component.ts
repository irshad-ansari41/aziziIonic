import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {BrochuresPage} from '../pages/brochures/brochures';
import {FloorplansPage} from '../pages/floorplans/floorplans';
import {EventsPage} from '../pages/events/events';
import {VideoGalleryPage} from '../pages/video-gallery//video-gallery';
import {MortgageCalculatorPage} from '../pages/mortgage-calculator/mortgage-calculator'

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{title: string, component: any,icon: string}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Projects', component: HomePage, icon:'home'},
            {title: 'List', component: ListPage, icon:'list'},
            {title: 'Brochures', component: BrochuresPage, icon:'document'},
            {title: 'Floorplans', component: FloorplansPage, icon:'document'},
            {title: 'Events', component: EventsPage, icon:'calendar',},
            {title: 'Video Gallery', component: VideoGalleryPage, icon:'videocam',},
            {title: 'Mortgage Calculator', component: MortgageCalculatorPage, icon:'calculator',}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
