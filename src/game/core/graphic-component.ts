import { GameObject } from './game-object';
import { Clonable } from './clonable';

export interface GraphicComponent extends Clonable<GraphicComponent> {
  update(gameObject: GameObject);
  destroy(gameObject: GameObject);
}
