import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ByteArkPlayer,
  ByteArkPlayerContainerProps,
  ByteArkPlayerContainerState,
  ByteArkPlayerError,
  // CreatePlaceholderFunction,
  CreatePlayerFunction,
  SetupPlayerFunction,
} from '../types';
import {
  createPlayerInstance,
  loadPlayerResources,
  setupPlayer,
  setupPlayerOptions,
} from '../utils/player';
import {
  defaultCreatePlayerFunction,
  defaultSetupPlayerFunction,
} from '../utils/function';
import {
  PLAYER_CSS_FILENAME,
  PLAYER_ENDPOINT,
  PLAYER_JS_FILENAME,
  PLAYER_SERVER_ENDPOINT,
  PLAYER_VERSION,
} from '../constants';
import { checkIfCanUseDOM } from '../utils/dom';
import {
  ByteArkPlayerContainerError,
  LoadPlayerResourceError,
  SetupPlayerOptionsError,
} from '../utils/error';
import { PlayerPlaceholderComponent } from './player-placeholder';

window.bytearkPlayer = window.bytearkPlayer || {};

@Component({
  selector: 'byteark-player-container',
  standalone: true,
  imports: [PlayerPlaceholderComponent],
  template: `
    <div style="position: relative; height: 100%;">
      @if (playerContainerState.showPlaceholder) {
      <player-placeholder
        [aspectRatio]="options.aspectRatio"
        (onClick)="onClickPlaceholder()"
        [className]="options.className"
        [error]="playerContainerState.error"
        [loaded]="playerContainerState.loaded"
        [playerProps]="options"
      ></player-placeholder>
      } @if (playerContainerState.error === null) {
      <div
        [style.display]="
          playerContainerState.showPlaceholder ? 'none' : 'initial'
        "
      >
        @if (this.options.audioOnlyMode) {
        <audio #target class="video-js" [class]="videoClasses"></audio>
        } @else {
        <video
          #target
          playsinline
          class="video-js"
          [class]="videoClasses"
        ></video>
        }
      </div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class ByteArkPlayerContainer implements OnInit, OnDestroy {
  @ViewChild('target') target!: ElementRef<HTMLVideoElement | HTMLAudioElement>;

  @Input() options!: ByteArkPlayerContainerProps;
  @Input() lazyLoad: boolean = false;
  @Input() playerEndpoint: string = PLAYER_ENDPOINT;
  @Input() playerServerEndpoint: string = PLAYER_SERVER_ENDPOINT;
  @Input() playerVersion: string = PLAYER_VERSION;
  @Input() playerJsFileName: string = PLAYER_JS_FILENAME;
  @Input() playerCssFileName: string = PLAYER_CSS_FILENAME;
  @Input() createPlayerFunction: CreatePlayerFunction =
    defaultCreatePlayerFunction;
  @Input() setupPlayerFunction: SetupPlayerFunction =
    defaultSetupPlayerFunction;

  private _player: ByteArkPlayer | null = null;
  private _initializeInProgress: boolean = false;
  private _playerContainerState: ByteArkPlayerContainerState = {
    loaded: false,
    ready: false,
    error: null,
    showPlaceholder: true,
  };
  private _videoClasses: string[] = [];

  get player(): ByteArkPlayer | null {
    return this._player;
  }
  set player(player: ByteArkPlayer | null) {
    this._player = player;
  }

  get initializeInProgress(): boolean {
    return this._initializeInProgress;
  }
  set initializeInProgress(value: boolean) {
    this._initializeInProgress = value;
  }

  get playerContainerState(): ByteArkPlayerContainerState {
    return this._playerContainerState;
  }
  set playerContainerState(state: ByteArkPlayerContainerState) {
    this._playerContainerState = state;
  }

  get videoClasses(): string[] {
    return this._videoClasses;
  }
  set videoClasses(classes: string[]) {
    this._videoClasses = classes;
  }

  onPlayerLoaded() {
    this.options.onPlayerLoaded?.();
  }

  onPlayerLoadError(
    error: ByteArkPlayerContainerError,
    originalError: ByteArkPlayerError | unknown
  ) {
    this.playerContainerState = { ...this.playerContainerState, error };
    this.options.onPlayerLoadError?.(error, originalError);
  }

  onPlayerSetup() {
    this.playerContainerState = { ...this.playerContainerState, loaded: true };
    this.options.onPlayerSetup?.();
  }

  onPlayerSetupError(
    error: ByteArkPlayerContainerError,
    originalError: ByteArkPlayerError | unknown
  ) {
    this.playerContainerState = { ...this.playerContainerState, error };
    this.options.onPlayerSetupError?.(error, originalError);
  }

  onPlayerCreated() {
    this.playerContainerState = {
      ...this.playerContainerState,
      showPlaceholder: false,
    };
    if (this.player) this.options.onPlayerCreated?.(this.player);
  }

  onPlayerReady() {
    this.playerContainerState = { ...this.playerContainerState, ready: true };
    if (this.player) this.options.onReady?.(this.player);
  }

  async onClickPlaceholder() {
    if (this.lazyLoad) {
      await this.initializePlayer();
      await this.player?.play();
    }
    this.playerContainerState = {
      ...this.playerContainerState,
      showPlaceholder: false,
    };
  }

  renderPlayer() {
    const videoClasses = [];
    if (this.options.className) videoClasses.push(this.options.className);
    if (this.options.fluid) {
      if (this.options.aspectRatio === '4:3') videoClasses.push('vjs-4-3');
      else if (this.options.aspectRatio === '16:9')
        videoClasses.push('vjs-16-9');
    }
    this.videoClasses = [...this.videoClasses, ...videoClasses];
  }

  async initializePlayer() {
    if (!checkIfCanUseDOM() || this.initializeInProgress) return;

    this.initializeInProgress = true;
    try {
      await loadPlayerResources({
        playerJsFileName: this.playerJsFileName,
        playerCssFileName: this.playerCssFileName,
        playerVersion: this.playerVersion,
        playerEndpoint: this.playerEndpoint,
        playerServerEndpoint: this.playerServerEndpoint,
        playerSlugId: this.options.playerSlugId,
      });

      this.onPlayerLoaded();
      const options = await setupPlayerOptions(this.options);
      await setupPlayer(options, this.setupPlayerFunction);
      this.onPlayerSetup();

      this.player = await createPlayerInstance(
        this.target.nativeElement,
        options,
        this.createPlayerFunction,
        this.onPlayerReady
      );

      this.onPlayerCreated();
    } catch (error) {
      if (error instanceof LoadPlayerResourceError) {
        this.onPlayerSetupError(error, error.originalError);
      } else if (error instanceof SetupPlayerOptionsError) {
        this.onPlayerLoadError(error, error.originalError);
      } else if (error instanceof ByteArkPlayerContainerError) {
        this.playerContainerState = { ...this.playerContainerState, error };
      }
      console.error(error);
    } finally {
      this.initializeInProgress = false;
    }
  }

  async ngOnInit() {
    if (!this.lazyLoad) await this.initializePlayer();
  }

  ngOnDestroy() {
    this.player?.dispose();
    this.player = null;
    this.playerContainerState = {
      ...this.playerContainerState,
      ready: false,
    };
  }
}
