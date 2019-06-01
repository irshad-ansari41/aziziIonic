import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionDetailsPage } from './construction-details';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicImageCacheModule } from 'ionic3-image-cache'
@NgModule({
  declarations: [
    ConstructionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionDetailsPage),
    PipesModule,
    IonicImageCacheModule
  ],
})
export class ConstructionDetailsPageModule { }
