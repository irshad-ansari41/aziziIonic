import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MortgageCalculatorPage } from './mortgage-calculator';

@NgModule({
  declarations: [
    MortgageCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(MortgageCalculatorPage),
  ],
})
export class MortgageCalculatorPageModule {}
