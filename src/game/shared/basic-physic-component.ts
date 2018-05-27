import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { MoveEvent } from '../events/move-event';
import { moveCommand } from '../commands/move-command';
import { fireCommand } from '../commands/fire-command';
import { PhysicComponent } from '../core/physic-component';

export class BasicPhysicComponent implements PhysicComponent {

  private movingOptions: MoveEvent;

  constructor(private speed: number) {
  }

  handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.Move:
        this.movingOptions = options as MoveEvent;
        break;
      default:
        break;
    }
  }

  init(gameObject: GameObject, word: World) {
  }

  update(gameObject: GameObject, world: World) {
    if (this.movingOptions) {
      this.move(gameObject, this.movingOptions, world);
    }
  }

  destroy(gameObject: GameObject, world: World) {
  }

  clone(): PhysicComponent {
    return new BasicPhysicComponent(this.speed);
  }

  private move(gameObject: GameObject, moveEvent: MoveEvent, world: World) {
    moveCommand.do(gameObject, { direction: moveEvent.direction, distance: this.speed, world  });
    this.movingOptions = null;
  }
}
