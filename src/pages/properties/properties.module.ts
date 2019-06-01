import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PropertiesPage} from './properties';
import {PipesModule} from '../../pipes/pipes.module';
import {IonicImageCacheModule} from 'ionic3-image-cache';


@NgModule({
    declarations: [
        PropertiesPage,
    ],
    imports: [
        IonicPageModule.forChild(PropertiesPage),
        PipesModule,
        IonicImageCacheModule
    ],
})
export class PropertiesPageModule {}
