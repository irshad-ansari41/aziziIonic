import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events,AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {BrochuresPage} from '../pages/brochures/brochures';
import {FloorplansPage} from '../pages/floorplans/floorplans';
import {EventsPage} from '../pages/events/events';
import {VideoGalleryPage} from '../pages/video-gallery/video-gallery';
import {EnquireNowPage} from '../pages/enquire-now/enquire-now';
//import {LoginPage} from '../pages/login/login';
//import {MortgageCalculatorPage} from '../pages/mortgage-calculator/mortgage-calculator'
import {ConstructionUpdatesPage} from '../pages/construction-updates/construction-updates'


@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    public currentUser: any = {id: 0, first_name: '', last_name: '', email: '', password: '', status: 0};

    rootPage: any = HomePage;

    pages: Array<{title: string, component: any, icon: string}>;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen, 
        private alertCtrl: AlertController,
        public events: Events) {
        this.initializeApp();
        this.getUserInfo();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Projects', component: HomePage, icon: 'home'},
            {title: 'Construction Updates', component: ConstructionUpdatesPage, icon: 'list'},
            {title: 'Brochures', component: BrochuresPage, icon: 'document'},
            {title: 'Floorplans', component: FloorplansPage, icon: 'document'},
            {title: 'Events', component: EventsPage, icon: 'calendar', },
            {title: 'Video Gallery', component: VideoGalleryPage, icon: 'videocam', },
            //{title: 'Mortgage Calculator', component: MortgageCalculatorPage, icon: 'calculator', },
            {title: 'Enquire Now', component: EnquireNowPage, icon: 'mail', },
        ];

        events.subscribe('user:login', (user, time) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('Welcome', user, 'at', time);
            location.reload();
        });

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    BehaviourSubject() {


    }

    openPage(page: any) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    public getUserInfo() {
        let user = JSON.parse(localStorage.getItem('User'));
        if (typeof user !== 'undefined' && user !== null) {
            this.currentUser = user;
        }
    }
    

    logOut() {
        const confirm = this.alertCtrl.create({
            title: 'Logout Confirmation',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        localStorage.setItem('User', JSON.stringify({id: 0, first_name: '', last_name: '', email: '', password: '', status: 0}));
                        this.nav.setRoot(HomePage);
                        location.reload();
                    }
                }
            ]
        });
        confirm.present();
    }
}
