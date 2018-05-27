import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { Clonable } from '../core/clonable';

export class PhoenixLogicComponent implements LogicComponent {

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
  update(gameObject: GameObject, world: World) {
    if (this.isHitted) {
      this.getHit(world);
    }
  }

  destroy(gameObject: GameObject, world: World) {
  }

  clone(): LogicComponent {
    return new PhoenixLogicComponent();
  }

  private getHit(world: World) {
    alert('game over');
    world.sendEvent(EventTypes.GameOver);
    this.isHitted = false;
  }
}