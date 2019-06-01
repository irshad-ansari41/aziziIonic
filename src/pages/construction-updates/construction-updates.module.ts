import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionUpdatesPage } from './construction-updates';
import {PipesModule} from '../../pipes/pipes.module';
import {IonicImageCacheModule} from 'ionic3-image-cache';

@NgModule({
  declarations: [
    ConstructionUpdatesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionUpdatesPage),
    PipesModule,
    IonicImageCacheModule
  ],
})
export class ConstructionUpdatesPageModule {}
