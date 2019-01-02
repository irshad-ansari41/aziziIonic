import { NgModule } from '@angular/core';
import { CustomPipe } from './custom/custom';
import { KeysPipe } from './keys/keys';
@NgModule({
	declarations: [CustomPipe,
    KeysPipe],
	imports: [],
	exports: [CustomPipe,
    KeysPipe]
})
export class PipesModule {}
