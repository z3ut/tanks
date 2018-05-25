import { GameObject } from './game-object';

export interface GraphicComponent {
  update(gameObject: GameObject);
  destroy(gameObject: GameObject);
}
