import { GameObject } from './game-object';
import { World } from './world';
import { EventTypes } from '../events/event-types';

export interface PhysicComponent {
  update(gameObject: GameObject, world: World);
  handleEvent(type: EventTypes, options?: any);
  destroy(gameObject: GameObject, world: World);
}