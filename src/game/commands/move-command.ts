import { Command } from '../core/command';
import { GameObject } from '../core/game-object';
import { Direction } from '../core/direction';
import { World } from '../core/world';
import { Boundaries } from '../core/boundaries';
import { calculateMovePositon } from '../utils/coords';
import { EventTypes } from '../events/event-types';

export interface MoveCommandOptions {
  direction: Direction;
  distance: number;
  isIgnoreObjects?: boolean;
  world: World;
}

export class MoveCommand implements Command {
  do(gameObject: GameObject, options: MoveCommandOptions) {
    const currentBoundaries = gameObject.boundaries;
    gameObject.direction = options.direction;

    const startX = gameObject.x;
    const startY = gameObject.y;

    const { x: moveX, y: moveY } = calculateMovePositon(gameObject.x, gameObject.y, gameObject.direction, options.distance);

    let previousX = startX;
    let previousY = startY;

    if (options.isIgnoreObjects) {
      gameObject.x = moveX;
      gameObject.y = moveY;
      return;
    }

    for (let deltaX = 0; Math.abs(deltaX) <= Math.abs(moveX - startX); deltaX += (moveX - startX > 0 ? 1 : -1)) {
      for (let deltaY = 0; Math.abs(deltaY) <= Math.abs(moveY - startY); deltaY += (moveY - startY > 0 ? 1 : -1)) {
        gameObject.x = startX + deltaX;
        gameObject.y = startY + deltaY;

        if (!this.isValidPosition(options.world, gameObject.boundaries, gameObject)) {
          const collision = options.world.findCollision(gameObject.boundaries, gameObject)

          gameObject.x = previousX;
          gameObject.y = previousY;

          if (collision) {
            collision.handleEvent(EventTypes.Collision, { collision: gameObject });
          }

          gameObject.handleEvent(EventTypes.Collision, { collision });
        }
      }
    }
  }

  private isValidPosition(world: World, boundaries: Boundaries,
      gameObject: GameObject): boolean {
    return world.isInsideWorld(boundaries) &&
      world.findCollision(boundaries, gameObject) == null;
  }
}

export const moveCommand = new MoveCommand();
