import { Component, Input } from '@angular/core';
import { type ByteArkPlayerContainerError } from '../utils/error';

@Component({
  selector: 'player-load-error-message',
  standalone: true,
  imports: [],
  template: `
    <div [style]="containerStyle">
      <div>
        <p [style]="primaryTextStyle">
          {{ this.errorData.message }}
        </p>
        <p [style]="secondaryTextStyle">
          {{ this.errorData.messageSecondary }}
        </p>
        <p [style]="errorCodeTextStyle">
          {{ this.errorData.code }}
        </p>
      </div>
    </div>
  `,
})
export class PlayerLoadErrorMessageComponent {
  @Input() error: ByteArkPlayerContainerError | null = null;

  errorData = this.error || {
    message: 'An unknown error occurred',
    messageSecondary: 'Please refresh the page to try again.',
    code: 'ERROR_BYTEARK_PLAYER_REACT_100000',
  };

  containerStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };

  primaryTextStyle = {
    color: '#eaeaea',
    fontWeight: 'bold',
    marginBottom: 0,
  };

  secondaryTextStyle = {
    color: '#bababa',
    marginBottom: 0,
  };

  errorCodeTextStyle = {
    color: '#7a7a7a',
    fontSize: 'smaller',
    marginTop: '1rem',
    marginBottom: 0,
  };
}
