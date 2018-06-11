import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { MoveEvent } from '../events/move-event';
import { fireCommand } from '../commands/fire-command';

export class TankLogicComponent implements LogicComponent {

  private movingOptions: MoveEvent;
  private isFired: boolean;
  private isHitted: boolean;

  constructor(private hitEvent: EventTypes) {
  }

  handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.Fire:
        this.isFired = true;
        break;
      case EventTypes.Hit:
        this.isHitted = true;
        break;
      default:
    }
  }

  init(gameObject: GameObject, word: World) {
  }

  update(gameObject: GameObject, world: World) {
    if (this.isFired) {
      this.fire(gameObject, world);
    }

    if (this.isHitted) {
      this.getHit(gameObject, world);
    }
  }

  destroy(gameObject: GameObject, world: World) {
  }

  clone(): LogicComponent {
    return new TankLogicComponent(this.hitEvent);
  }

  private fire(gameObject: GameObject, world: World) {
    fireCommand.do(gameObject, {
      direction: gameObject.direction,
      world
    });
    this.isFired = false;
  }

  private getHit(gameObject: GameObject, world: World) {
    world.sendEvent(this.hitEvent);
    gameObject.destroy(world);
  }
}
