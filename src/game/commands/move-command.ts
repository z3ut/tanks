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

    // const deltaX = moveX - gameObject.x;
    // const deltaY = moveY - gameObject.y;

    // currentBoundaries.leftX += deltaX;
    // currentBoundaries.rightX += deltaX;
    // currentBoundaries.topY += deltaY;
    // currentBoundaries.bottomY += deltaY;

    // if (!options.world.isInsideWorld(currentBoundaries)) {
    //   // TODO: set position to boundaries of world
    // }

    // if (options.isIgnoreObjects) {
    //   gameObject.x = moveX;
    //   gameObject.y = moveY;
    // }

    let previousX = startX;
    let previousY = startY;

    if (options.isIgnoreObjects) {
      gameObject.x = moveX;
      gameObject.y = moveY;
      return;
    }

    // TODO: add diagonal path
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
          
          return collision;
        }
      }
    }


    // const intersection = options.world.findCollisionOnPath(gameObject, moveX, moveY);

    // if (intersection) {
    //   gameObject.x = intersection.x;
    //   gameObject.y = intersection.y;
    //   gameObject.handleEvent(EventTypes.Collision, { intersection: intersection.gameObject });
    //   return;
    // }

    // gameObject.x = moveX;
    // gameObject.y = moveY;


    // TODO: Обработка процесса прохода объекта с границами по ходу
    // switch (options.direction) {
    //   case Direction.Bottom:
    //     currentBoundaries.bottomY += options.distance;
    //     currentBoundaries.topY += options.distance;
    //     if (options.isIgnoreObjects || this.isValidPosition(options.world, currentBoundaries, gameObject)) {
    //       gameObject.y += options.distance;
    //     }
    //     break;
    //   case Direction.Left:
    //     currentBoundaries.leftX -= options.distance;
    //     currentBoundaries.rightX -= options.distance;
    //     if (options.isIgnoreObjects || this.isValidPosition(options.world, currentBoundaries, gameObject)) {
    //       gameObject.x -= options.distance;
    //     }
    //     break;
    //   case Direction.Right:
    //     currentBoundaries.leftX += options.distance;
    //     currentBoundaries.rightX += options.distance;
    //     if (options.isIgnoreObjects || this.isValidPosition(options.world, currentBoundaries, gameObject)) {
    //       gameObject.x += options.distance;
    //     }
    //     break;
    //   case Direction.Top:
    //     currentBoundaries.bottomY -= options.distance;
    //     currentBoundaries.topY -= options.distance;
    //     if (options.isIgnoreObjects || this.isValidPosition(options.world, currentBoundaries, gameObject)) {
    //       gameObject.y -= options.distance;
    //     }
    //     break;
    // }
  }

  private isValidPosition(world: World, boundaries: Boundaries,
      gameObject: GameObject): boolean {
    return world.isInsideWorld(boundaries) &&
      world.findCollision(boundaries, gameObject) == null;
  }
}

export const moveCommand = new MoveCommand();
