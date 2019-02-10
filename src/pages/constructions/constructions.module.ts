import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionsPage } from './constructions';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ConstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionsPage),
    PipesModule
  ],
})
export class ConstructionsPageModule {}
