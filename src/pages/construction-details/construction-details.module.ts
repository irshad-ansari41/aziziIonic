import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionDetailsPage } from './construction-details';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ConstructionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionDetailsPage),
    PipesModule
  ],
})
export class ConstructionDetailsPageModule {}
