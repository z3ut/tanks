import { GameObject } from './game-object';
import { EventTypes } from '../events/event-types';
import { isCollided, isInside, isIntersect } from '../utils/collision';
import { Boundaries } from './boundaries';

export class World {

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
    }
  }

  update() {
    for (let g of this.gameObjects) {
      g.update(this);
    }
  }

  render() {
    for (let g of this.gameObjects) {
      g.render();
    }
  }

  findCollision(boundaries: Boundaries, gameObject?: GameObject): GameObject {
    for (let g of this.physicalGameObjects) {
      if (isCollided(boundaries, g.boundaries) && gameObject != g) {
        return g;
      }
    }
    return null;
  }

  isInsideWorld(boundaries: Boundaries) {
    return isInside(boundaries, this.boundaries);
  }

  sendEvent(type: EventTypes, options?: any) {
    for (let g of this.gameObjects) {
      g.handleEvent(type, options);
    }
  }
}
