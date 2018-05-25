import { InputComponent } from '../core/input-component';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { Direction } from '../core/direction';

export class AiTankImportComponent implements InputComponent {

  

  constructor() {
  }

  update(gameObject: GameObject) {
    return;
    const action = Math.round(Math.random() * 100);

    if (action < 10) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Top });
    }

    if (10 <= action && action < 20) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Right });
    }

    if (20 <= action && action < 30) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Bottom });
    }

    if (30 <= action && action < 40) {
      gameObject.handleEvent(EventTypes.Move, { direction: Direction.Left });
    }

    if (40 <= action && action < 50) {
      gameObject.handleEvent(EventTypes.Fire);
    }
  }

  clone(): InputComponent {
    return new AiTankImportComponent();
  }
}