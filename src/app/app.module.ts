import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

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
import {VideoGalleryPageModule} from '../pages/video-gallery/video-gallery.module';
import {MortgageCalculatorPageModule} from '../pages/mortgage-calculator/mortgage-calculator.module';
import {EnquireNowPageModule} from '../pages/enquire-now/enquire-now.module';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PropertyProvider} from '../providers/property/property';
import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer';
import {DocumentViewer} from '@ionic-native/document-viewer';

import {PipesModule} from '../pipes/pipes.module';

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
        EnquireNowPageModule
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
        PropertyProvider,
        File,
        FileTransfer,
        DocumentViewer,
    ]
})


export class AppModule {}
