import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CommunityPage} from './community';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        CommunityPage,
    ],
    imports: [
        IonicPageModule.forChild(CommunityPage),
        PipesModule
    ],
})
export class CommunityPageModule {}
