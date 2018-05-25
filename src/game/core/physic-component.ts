import { GameObject } from './game-object';
import { World } from './world';
import { EventTypes } from '../events/event-types';
import { Clonable } from './clonable';

export interface PhysicComponent extends Clonable<PhysicComponent> {
  update(gameObject: GameObject, world: World);
  handleEvent(type: EventTypes, options?: any);
  destroy(gameObject: GameObject, world: World);
}
