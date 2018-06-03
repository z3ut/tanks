import { GameObject } from './game-object';
import { World } from './world';
import { EventTypes } from '../events/event-types';
import { Clonable } from './clonable';

export interface LogicComponent extends Clonable<LogicComponent> {
  init(gameObject: GameObject, word: World): void;
  update(gameObject: GameObject, world: World): void;
  handleEvent(type: EventTypes, options?: any): void;
  destroy(gameObject: GameObject, world: World): void;
}
