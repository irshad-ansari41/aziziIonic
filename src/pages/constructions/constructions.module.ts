import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionsPage } from './constructions';
import {PipesModule} from '../../pipes/pipes.module';
import {IonicImageCacheModule} from 'ionic3-image-cache'

@NgModule({
  declarations: [
    ConstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionsPage),
    PipesModule,
    IonicImageCacheModule
  ],
})
export class ConstructionsPageModule {}
