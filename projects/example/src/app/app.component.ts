import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ByteArkPlayerContainer,
  ByteArkPlayerOptions,
} from 'byteark-player-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ByteArkPlayerContainer],
  template: `<main class="main">
    <div class="content">
      <h1>ByteArk Player</h1>
      <div style="width: 800px">
        <byteark-player-container
          [options]="options"
        ></byteark-player-container>
      </div>
    </div>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'showcase';
  options: ByteArkPlayerOptions = {
    fluid: true,
    aspectRatio: '16:9',
    autoplay: true,
    playbackRates: [0.5, 1, 1.5, 2],
    fullscreen: {
      enabled: true,
      default: true,
    },
    poster:
      'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
    sources: [
      {
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4',
      },
    ],
  };
}
