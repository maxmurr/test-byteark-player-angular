import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { videos } from './data';

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
  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: 'any',
    muted: true,
    aspectRatio: '16:9',
    poster: videos[0].poster,
    controls: true,
    lazyload: false,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
    plugins: {
      bytearkAds: {
        adTagUrl:
          'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
      },
    },
    onPlayerLoaded: () => {
      console.log('Loaded!');
    },
    onPlayerLoadError: (error, originalError) => {
      console.log('Error!', error, originalError);
    },
    onPlayerSetup: () => {
      console.log('Setup!');
    },
    onPlayerSetupError: (error, originalError) => {
      console.log('Setup Error!', error, originalError);
    },
    onPlayerCreated: () => {
      console.log('Created!');
    },
    onReady: () => {
      console.log('Ready!');
    },
  };
}
