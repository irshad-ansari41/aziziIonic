import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoGalleryPage } from './video-gallery';

@NgModule({
  declarations: [
    VideoGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoGalleryPage),
  ],
})
export class VideoGalleryPageModule {}
