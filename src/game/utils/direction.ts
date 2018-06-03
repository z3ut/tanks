import { Direction } from '../core/direction';

export function directionToDegree(direction: Direction) {
  switch (direction) {
    case Direction.Top:
      return 0;
    case Direction.Right:
      return 90;
    case Direction.Bottom:
      return 180;
    case Direction.Left:
      return 270;
    default: return 0;
  }
}
