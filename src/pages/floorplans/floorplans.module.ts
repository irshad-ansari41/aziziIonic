import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorplansPage } from './floorplans';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FloorplansPage,
  ],
  imports: [
    IonicPageModule.forChild(FloorplansPage),
    PipesModule
  ],
})
export class FloorplansPageModule {}
