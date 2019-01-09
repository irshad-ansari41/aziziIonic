import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { EnquireNowPage } from './enquire-now';


@NgModule({
  declarations: [
    EnquireNowPage,
  ],
  imports: [
    IonicPageModule.forChild(EnquireNowPage),
    IonicSelectableModule
  ],
})
export class EnquireNowPageModule {}
