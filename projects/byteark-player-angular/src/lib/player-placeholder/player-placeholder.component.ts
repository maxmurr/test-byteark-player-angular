import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { PlayerLoadErrorMessageComponent } from '../player-load-error-message/player-load-error-message.component';
import {
  type ByteArkPlayerContainerState,
  type ByteArkPlayerContainerProps,
} from '../../types';
import { CommonModule } from '@angular/common';

function getPlaceholderPaddingTopFromAspectRatio(aspectRatio: unknown): number {
  if (typeof aspectRatio === 'number') {
    return aspectRatio;
  }

  if (typeof aspectRatio !== 'string') {
    return 0;
  }

  const [width, height] = aspectRatio.split(':').map(Number.parseFloat);

  if (width === 0 || height === 0) {
    return 0;
  }

  return (height / width) * 100;
}

@Component({
  selector: 'player-placeholder',
  standalone: true,
  imports: [CommonModule, PlayerLoadErrorMessageComponent],
  templateUrl: './player-placeholder.component.html',
})
export class PlayerPlaceholderComponent implements OnChanges {
  @Input() playerProps!: ByteArkPlayerContainerProps;
  @Input() state!: Pick<ByteArkPlayerContainerState, 'error' | 'loaded'>;
  @Output() onClickPlaceholder = new EventEmitter();

  private _placeholderCustomStyle: Record<string, string> = {
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
  private _playIconStyle: Record<string, string> = {
    position: 'absolute',
    width: '90px',
    top: '50%',
    left: '50%',
    marginTop: '-2.75em',
    marginLeft: '-2.75em',
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '50%',
  };
  private _pathStyle: Record<string, string> = {
    fill: '#ffffff',
    transform: 'translateX(13px) translateY(9px) scale(0.7)',
  };

  get placeholderCustomStyle() {
    return this._placeholderCustomStyle;
  }
  set placeholderCustomStyle(style: Record<string, string>) {
    this._placeholderCustomStyle = style;
  }
  get playIconStyle() {
    return this._playIconStyle;
  }
  set playIconStyle(style: Record<string, string>) {
    this._playIconStyle = style;
  }
  get pathStyle() {
    return this._pathStyle;
  }
  set pathStyle(style: Record<string, string>) {
    this._pathStyle = style;
  }
  get error() {
    return this.state.error;
  }
  get loaded() {
    return this.state.loaded;
  }
  get aspectRatio() {
    return this.playerProps?.aspectRatio;
  }
  get fluid() {
    return this.playerProps?.fluid;
  }
  get fill() {
    return this.playerProps?.fill;
  }
  get lazyload() {
    return this.playerProps?.lazyload;
  }
  get poster() {
    return this.playerProps?.poster;
  }
  get className() {
    return this.playerProps?.className;
  }

  ngOnChanges(): void {
    if (this.fluid) {
      this.placeholderCustomStyle[
        'paddingTop'
      ] = `${getPlaceholderPaddingTopFromAspectRatio(
        this.aspectRatio || '16:9'
      )}%`;
    }
    if (!this.fluid && this.fill) {
      this.placeholderCustomStyle['height'] = '100%';
      this.placeholderCustomStyle['minHeight'] = '100%';
    }

    if (this.lazyload && !this.loaded) {
      this.placeholderCustomStyle['position'] = 'relative';
    }
    if (this.lazyload && this.loaded) {
      this.placeholderCustomStyle['position'] = 'absolute';
    }

    if (!this.error) {
      // set placeholder poster image
      if (this.poster) {
        this.placeholderCustomStyle[
          'backgroundImage'
        ] = `url(${this.playerProps?.poster})`;
      }

      this.placeholderCustomStyle['cursor'] = 'pointer';
    }
  }

  shouldShowPlayIcon =
    this.playerProps?.controls === undefined ||
    this.playerProps?.controls === null ||
    this.playerProps?.controls === true;
}
