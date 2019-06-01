import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertyPage } from './property';
import {IonicImageCacheModule} from 'ionic3-image-cache';


@NgModule({
  declarations: [
    PropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertyPage),
    IonicImageCacheModule
  ],
})
export class PropertyPageModule {}
