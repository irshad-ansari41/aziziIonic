import {BrowserModule,HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicSelectableModule} from 'ionic-selectable';
import * as ionicGalleryModal from 'ionic-gallery-modal';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {MorePageModule} from '../pages/more/more.module';
import {PropertyPageModule} from '../pages/property/property.module';
import {PropertiesPageModule} from '../pages/properties/properties.module';
import {CommunityPageModule} from '../pages/community/community.module';
import {BrochuresPageModule} from '../pages/brochures/brochures.module';
import {FloorplansPageModule} from '../pages/floorplans/floorplans.module';
import {EventsPageModule} from '../pages/events/events.module';
import {EventDetailsPageModule} from '../pages/event-details/event-details.module';
import {VideoGalleryPageModule} from '../pages/video-gallery/video-gallery.module';
import {MortgageCalculatorPageModule} from '../pages/mortgage-calculator/mortgage-calculator.module';
import {EnquireNowPageModule} from '../pages/enquire-now/enquire-now.module';
import {ConstructionUpdatesPageModule} from '../pages/construction-updates/construction-updates.module';
import {ConstructionsPageModule} from '../pages/constructions/constructions.module';
import {ConstructionDetailsPageModule} from '../pages/construction-details/construction-details.module';
import {MapPageModule} from '../pages/map/map.module';
import {ViewVideoPageModule} from '../pages/view-video/view-video.module';
import {LoginPageModule} from '../pages/login/login.module';
import {ContactPageModule} from '../pages/contact/contact.module';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PropertyProvider} from '../providers/property/property';
import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer';
import {DocumentViewer} from '@ionic-native/document-viewer';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {NativeStorage} from '@ionic-native/native-storage';
import {IonicStorageModule} from '@ionic/storage';
import {SocialSharing} from '@ionic-native/social-sharing';
import {IonicImageCacheModule} from 'ionic3-image-cache';

import {PipesModule} from '../pipes/pipes.module';
import {AuthProvider} from '../providers/auth/auth';
import {LeadProvider} from '../providers/lead/lead';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        IonicSelectableModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        IonicImageCacheModule.forRoot(),
        ionicGalleryModal.GalleryModalModule,
        PipesModule,
        PropertiesPageModule,
        CommunityPageModule,
        PropertyPageModule,
        BrochuresPageModule,
        FloorplansPageModule,
        EventsPageModule,
        VideoGalleryPageModule,
        MortgageCalculatorPageModule,
        MorePageModule,
        EnquireNowPageModule,
        EventDetailsPageModule,
        ConstructionUpdatesPageModule,
        ConstructionsPageModule,
        ConstructionDetailsPageModule,
        MapPageModule,
        ViewVideoPageModule,
        LoginPageModule,
        ContactPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig},
        PropertyProvider,
        File,
        FileTransfer,
        DocumentViewer,
        InAppBrowser,
        AuthProvider,
        NativeStorage,
        SocialSharing,
        LeadProvider
    ]
})


export class AppModule {}
