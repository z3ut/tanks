import { GameObject } from './game-object';
import { EventTypes } from '../events/event-types';
import { isCollided, isInside, isIntersect } from '../utils/collision';
import { Boundaries } from './boundaries';
import { GameOverType } from '../events/game-over-type';
import { GameOverEvent } from '../events/game-over-event';

export class World {

  isGameOver: boolean;
  gameResult: GameOverType;
  enemiesKilled: number;

  width: number;
  height: number;

  gameObjects: GameObject[];

  get physicalGameObjects(): GameObject[] {
    return this.gameObjects.filter(g => !g.isNotPhysical);
  }

  get boundaries(): Boundaries {
    return {
      topY: 0,
      rightX: this.width,
      bottomY: this.height,
      leftX: 0
    };
  }

  update() {
    for (const g of this.gameObjects) {
      g.update(this);
    }
  }

  render() {
    for (const g of this.gameObjects) {
      g.render();
    }
  }

  findCollision(boundaries: Boundaries, gameObject?: GameObject): GameObject {
    for (const g of this.physicalGameObjects) {
      if (isCollided(boundaries, g.boundaries) && gameObject !== g) {
        return g;
      }
    }
    return null;
  }

  isInsideWorld(boundaries: Boundaries) {
    return isInside(boundaries, this.boundaries);
  }

  sendEvent(type: EventTypes, options?: any) {
    this.handleEvent(type, options);

    for (const g of this.gameObjects) {
      g.handleEvent(type, options);
    }
  }

  private handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.GameOver:
        const gameOverOptions = options as GameOverEvent;
        this.isGameOver = true;
        this.gameResult = gameOverOptions.result;
        this.enemiesKilled = gameOverOptions.enemiesKilled;
        break;
      default:
    }
  }
}
