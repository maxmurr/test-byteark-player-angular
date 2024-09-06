import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ByteArkPlayer,
  ByteArkPlayerContainer,
  ByteArkPlayerContainerError,
  ByteArkPlayerContainerState,
  type ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { SiteHeaderComponent } from '../../components/site-header.component';
import { videos } from '../videos';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SiteHeaderComponent,
    ByteArkPlayerContainer,
  ],
  templateUrl: './sample-blog.component.html',
})
export class SampleBlogComponent {
  title = 'ByteArk Player Container | Sample Blog';
  player?: ByteArkPlayer;
  error: ByteArkPlayerContainerError | null = null;
  playerContainerState: ByteArkPlayerContainerState = {
    loaded: false,
    ready: false,
    error: null,
    showPlaceholder: true,
  };
  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: videos[0].poster,
    seekButtons: true,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
    onPlayerCreated: (player) => {
      this.player = player;
    },
    onPlayerSetupError: (error, originalError) => {
      this.error = error;
      console.log('onPlayerSetupError', error, originalError);
    },
    onPlayerLoadError: (error, originalError) => {
      this.error = error;
      console.log('onPlayerLoadError', error, originalError);
    },
  };
  placeholderCustomStyle: Record<string, string> = {
    position: 'relative',
    width: '100%',
    minWidth: '100%',
    background: '#000000',
    backgroundImage: 'none',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'default',
    paddingTop: '',
    height: '',
    minHeight: '',
  };
  playIconStyle: Record<string, string> = {
    position: 'absolute',
    width: '90px',
    top: '50%',
    left: '50%',
    marginTop: '-2.75em',
    marginLeft: '-2.75em',
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '50%',
  };
  pathStyle: Record<string, string> = {
    fill: '#ffffff',
    transform: 'translateX(13px) translateY(9px) scale(0.7)',
  };

  async onClickPlaceholder() {
    await this.player?.play();
  }
}
