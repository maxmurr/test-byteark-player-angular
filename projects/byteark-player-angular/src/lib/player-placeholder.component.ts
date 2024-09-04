import { Component, Input, OnChanges } from '@angular/core';
import { type ByteArkPlayerContainerError } from '../utils/error';
import { type ByteArkPlayerContainerProps } from '../types';
import { PlayerLoadErrorMessageComponent } from './player-load-error-message.component';

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
  imports: [PlayerLoadErrorMessageComponent],
  template: `
    @if(this.error) {
    <div [class]="this.className" [style]="this.placeholderCustomStyle">
      <player-load-error-message
        [error]="this.error"
      ></player-load-error-message>
    </div>
    } @else {
    <div
      (onClick)="onClick()"
      [class]="this.className"
      [style]="this.placeholderCustomStyle"
    >
      @if(this.shouldShowPlayIcon) {
      <svg [style]="this.playIconStyle" viewBox="0 0 56 56">
        <path
          [style]="this.pathStyle"
          d="M47.43,27.26,14.11,5.87A3.34,3.34,0,0,0,9,8.79V51.56a3.34,3.34,0,0,0,5.11,2.91L47.43,33.09A3.49,3.49,0,0,0,47.43,27.26Z"
        />
      </svg>
      }
    </div>
    }
  `,
})
export class PlayerPlaceholderComponent implements OnChanges {
  @Input() aspectRatio: string | undefined;
  @Input() onClick!: () => void;
  @Input() className: string | undefined;
  @Input() error: ByteArkPlayerContainerError | null = null;
  @Input() loaded!: boolean;
  @Input() playerProps!: ByteArkPlayerContainerProps;

  private _options = this.playerProps;
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

  get options() {
    return this._options;
  }
  set options(options: ByteArkPlayerContainerProps) {
    this._options = options;
  }
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

  ngOnChanges(): void {
    if (this.options.fluid) {
      this.placeholderCustomStyle[
        'paddingTop'
      ] = `${getPlaceholderPaddingTopFromAspectRatio(
        this.aspectRatio || '16:9'
      )}%`;
    }
    if (!this.options.fluid && this.options.fill) {
      this.placeholderCustomStyle['height'] = '100%';
      this.placeholderCustomStyle['minHeight'] = '100%';
    }

    if (this.options.lazyload && !this.loaded) {
      this.placeholderCustomStyle['position'] = 'relative';
    }
    if (this.options.lazyload && this.loaded) {
      this.placeholderCustomStyle['position'] = 'absolute';
    }

    if (!this.error) {
      // set placeholder poster image
      if (this.options.poster) {
        this.placeholderCustomStyle[
          'backgroundImage'
        ] = `url(${this.options.poster})`;
      }

      this.placeholderCustomStyle['cursor'] = 'pointer';
    }
  }

  shouldShowPlayIcon =
    this.options.controls === undefined ||
    this.options.controls === null ||
    this.options.controls === true;
}
