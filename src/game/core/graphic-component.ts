import { GameObject } from './game-object';
import { Clonable } from './clonable';

export interface GraphicComponent extends Clonable<GraphicComponent> {
  init(gameObject: GameObject): void;
  update(gameObject: GameObject): void;
  destroy(gameObject: GameObject): void;
}
