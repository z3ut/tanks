import { GameObject } from './game-object';

export interface InputComponent {
  update(gameObject: GameObject);
}
