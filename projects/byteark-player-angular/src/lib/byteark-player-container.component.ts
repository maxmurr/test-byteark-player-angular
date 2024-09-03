import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import { ByteArkPlayerOptions } from './types';

@Component({
  selector: 'byteark-player-container',
  standalone: true,
  imports: [],
  template: `<video
    #target
    class="video-js"
    controls
    muted
    playsinline
    preload="none"
  ></video> `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class ByteArkPlayerContainer implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  // See options: https://videojs.com/guides/options
  @Input() options: ByteArkPlayerOptions | undefined;

  player: any;

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(
      this.target?.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
