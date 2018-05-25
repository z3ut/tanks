import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { moveCommand } from '../commands/move-command';
import { Direction } from '../core/direction';

export class ShellLogicComponent implements LogicComponent {

  private isDestroyed: boolean;

  constructor(private speed: number, private direction: Direction) {

  }

  handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.Fire:
        break;
      case EventTypes.Collision:
        if (options.collision) {
          options.collision.handleEvent(EventTypes.Hit);
        }
        this.isDestroyed = true;
        break;
      default:
    }
  }

  update(gameObject: GameObject, world: World) {
    if (this.isDestroyed) {
      gameObject.destroy(world);
      return;
    }
    moveCommand.do(gameObject, { direction: this.direction, distance: this.speed, isIgnoreObjects: false, world });
    const intersection = world.findCollision(gameObject.boundaries, gameObject);
    if (intersection) {
      intersection.handleEvent(EventTypes.Hit);
      gameObject.destroy(world);
      // world.gameObjects = world.gameObjects.filter(g => g !== gameObject);
    }
    if (!world.isInsideWorld(gameObject.boundaries)) {
      gameObject.destroy(world);
      // world.gameObjects = world.gameObjects.filter(g => g !== gameObject);
    }
  }

  destroy(gameObject: GameObject) {
  }

  clone(): LogicComponent {
    return new ShellLogicComponent(this.speed, this.direction);
  }
}
