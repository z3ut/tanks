import { InputComponent } from '../core/input-component';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { Direction } from '../core/direction';

export class ShellInputComponent implements InputComponent {
  constructor(private direction: Direction) {
  }

  update(gameObject: GameObject) {
    gameObject.handleEvent(EventTypes.Move, { direction: this.direction });
  }

  clone(): InputComponent {
    return new ShellInputComponent(this.direction);
  }
}
