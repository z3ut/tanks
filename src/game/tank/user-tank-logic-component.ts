import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { MoveEvent } from '../events/move-event';
import { moveCommand } from '../commands/move-command';
import { fireCommand } from '../commands/fire-command';

export class UserTankLogicComponent implements LogicComponent {

  private movingOptions: MoveEvent;
  private isFired: boolean;
  private isHitted: boolean;

  constructor(private speed: number) {
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
    return new UserTankLogicComponent(this.speed);
  }

  private fire(gameObject: GameObject, world: World) {
    fireCommand.do(gameObject, { direction: gameObject.direction, x: gameObject.x, y: gameObject.y, world });
    this.isFired = false;
  }

  private getHit(gameObject: GameObject, world: World) {
    alert('game over');
    world.sendEvent(EventTypes.GameOver);
  }
}
