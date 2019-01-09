import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoGalleryPage } from './video-gallery';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    VideoGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoGalleryPage),
    PipesModule
  ],
})
export class VideoGalleryPageModule {}
