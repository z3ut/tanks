import { GameObject } from './game-object';

export interface Command {
  do(gameObject: GameObject, options?: any);
}