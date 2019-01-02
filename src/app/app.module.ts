import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {PropertyPage} from '../pages/property/property';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PropertyProvider} from '../providers/property/property';
import {KeysPipe} from '../pipes/keys/keys'



@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        PropertyPage,
        KeysPipe
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        PropertyPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PropertyProvider
    ]
})

export class AppModule {}
