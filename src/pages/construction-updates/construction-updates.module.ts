import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionUpdatesPage } from './construction-updates';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ConstructionUpdatesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionUpdatesPage),
    PipesModule
  ],
})
export class ConstructionUpdatesPageModule {}
