import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PropertiesPage} from './properties';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        PropertiesPage,
    ],
    imports: [
        IonicPageModule.forChild(PropertiesPage),
        PipesModule
    ],
})
export class PropertiesPageModule {}
