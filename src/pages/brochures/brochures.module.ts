import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrochuresPage } from './brochures';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    BrochuresPage,
  ],
  imports: [
    IonicPageModule.forChild(BrochuresPage),
    PipesModule
  ],
})
export class BrochuresPageModule {}
