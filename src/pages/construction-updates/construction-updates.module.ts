import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionUpdatesPage } from './construction-updates';

@NgModule({
  declarations: [
    ConstructionUpdatesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionUpdatesPage),
  ],
})
export class ConstructionUpdatesPageModule {}
