import { InputComponent } from '../core/input-component';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { Direction } from '../core/direction';

export class UserTankInputComponent implements InputComponent {

  lastKeyCode: number;

  private keyCodesTop = [ 87 ];
  private keyCodesRight = [ 68 ];
  private keyCodesBottom = [ 83 ];
  private keyCodesLeft = [ 65 ];
  private keyCodesFire = [ 32 ];

  constructor() {
    document.addEventListener('keydown', event => {
      this.lastKeyCode = event.keyCode;
    });
  }

  update(gameObject: GameObject) {
    if (this.lastKeyCode === -1) {
      return;
    }

    if (this.keyCodesTop.includes(this.lastKeyCode)) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Top });
    }

    if (this.keyCodesRight.includes(this.lastKeyCode)) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Right });
    }

    if (this.keyCodesBottom.includes(this.lastKeyCode)) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Bottom });
    }

    if (this.keyCodesLeft.includes(this.lastKeyCode)) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Left });
    }

    if (this.keyCodesFire.includes(this.lastKeyCode)) {
      gameObject.handleEvent(EventTypes.Fire);
    }

    this.lastKeyCode = -1;
  }

  clone(): InputComponent {
    return new UserTankInputComponent();
  }
}
