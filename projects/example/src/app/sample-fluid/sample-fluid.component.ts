import { Component, signal, effect } from '@angular/core';
import {
  ByteArkPlayerContainer,
  type ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { type Video, videos } from '../videos';
import { VideoInfoComponent } from '../../components/video-info.component';
import { SiteNavComponent } from '../../components/site-nav.component';
import { VideoListComponent } from '../../components/video-list.component';

@Component({
  selector: 'app-sample-fluid',
  standalone: true,
  imports: [
    SiteNavComponent,
    ByteArkPlayerContainer,
    VideoInfoComponent,
    VideoListComponent,
  ],
  templateUrl: './sample-fluid.component.html',
})
export class SampleFluidComponent {
  public videos = videos;
  private _video = videos[0];
  private _options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: this.video.poster,
    sources: [
      {
        src: this.video.src,
        type: this.video.type,
        title: this.video.title,
      },
    ],
    onPlayerCreated: () => {
      console.log('Created!');
    },
    onReady: () => {
      console.log('Ready!');
    },
  };

  get video() {
    return this._video;
  }
  set video(video: Video) {
    this._video = video;
  }
  get options() {
    return this._options;
  }
  set options(options: ByteArkPlayerContainerProps) {
    this._options = options;
  }

  public setVideo($event: Video) {
    this.video = $event;
    this.options = {
      ...this.options,
      poster: this.video.poster,
      sources: [
        {
          src: this.video.src,
          type: this.video.type,
          title: this.video.title,
        },
      ],
    };
  }
}
