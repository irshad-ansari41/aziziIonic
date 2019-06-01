import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from './community';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicImageCacheModule } from 'ionic3-image-cache'
@NgModule({
    declarations: [
        CommunityPage,
    ],
    imports: [
        IonicPageModule.forChild(CommunityPage),
        PipesModule,
        IonicImageCacheModule
    ],
})
export class CommunityPageModule { }
