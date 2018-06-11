import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';

export class BrickWallLogicComponent implements LogicComponent {

  private isHitted: boolean;

  constructor() {
  }

  handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.Hit:
        this.isHitted = true;
        break;
      default:
    }
  }

  init(gameObject: GameObject, word: World) {
  }

  update(gameObject: GameObject, world: World) {
    if (this.isHitted) {
      this.getHit(gameObject, world);
    }
  }

  destroy(gameObject: GameObject, world: World) {
  }

  clone(): LogicComponent {
    return new BrickWallLogicComponent();
  }

  private getHit(gameObject: GameObject, world: World) {
    gameObject.destroy(world);
  }
}
