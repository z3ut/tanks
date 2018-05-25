import { GameObject } from './game-object';
import { Clonable } from './clonable';

export interface InputComponent extends Clonable<InputComponent> {
  update(gameObject: GameObject);
}
