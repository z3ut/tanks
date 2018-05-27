import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { MoveEvent } from '../events/move-event';
import { moveCommand } from '../commands/move-command';
import { fireCommand } from '../commands/fire-command';
import { Direction } from '../core/direction';

export class AiTankLogicComponent implements LogicComponent {

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
    return new AiTankLogicComponent(this.speed);
  }

  private fire(gameObject: GameObject, world: World) {
    let shellX, shellY;
    switch (gameObject.direction) {
      case Direction.Top:
        shellX = gameObject.boundaries.bottomY - 1;
        shellY = gameObject.y;
        break;
      case Direction.Right:
        shellX = gameObject.x;
        shellY = gameObject.boundaries.rightX + 1;
        break;
      case Direction.Bottom:
        shellX = gameObject.boundaries.bottomY + 1;
        shellY = gameObject.y;
        break;
      case Direction.Left:
        shellX = gameObject.x;
        shellY = gameObject.boundaries.leftX - 1;
        break;

    }
    fireCommand.do(gameObject, { direction: gameObject.direction, x: shellX, y: shellY, world });
    this.isFired = false;
  }

  private getHit(gameObject: GameObject, world: World) {
    world.sendEvent(EventTypes.AiTankKilled);
    gameObject.destroy(world);
  }
}
