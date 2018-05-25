import { Direction } from "../core/direction";
import { Boundaries } from "../core/boundaries";

export function calculateMovePositon(x: number, y: number,
    direction: Direction, distance: number): { x: number, y: number } {
  let moveX, moveY;

  switch (direction) {
    case Direction.Top:
      moveX = x;
      moveY = y - distance;
      break;
    case Direction.Right:
      moveX = x + distance;
      moveY = y;
      break;
    case Direction.Bottom:
      moveX = x;
      moveY = y + distance;
      break;
    case Direction.Left:
      moveX = x - distance;
      moveY = y;
      break;
  }

  return { x: moveX, y: moveY };
}

export function calculatePointOnBoundaries(boundaries: Boundaries,
    direction: Direction): { x: number, y: number } {
  let pointX, pointY;

  switch (direction) {
    case Direction.Top:
      pointX = (boundaries.leftX + boundaries.rightX) / 2;
      pointY = boundaries.topY - 1;
      break;
    case Direction.Right:
      pointX = boundaries.rightX + 1;
      pointY = (boundaries.topY + boundaries.bottomY) / 2;
      break;
    case Direction.Bottom:
      pointX = (boundaries.leftX + boundaries.rightX) / 2;
      pointY = boundaries.bottomY + 1;
      break;
    case Direction.Left:
      pointX = boundaries.leftX - 1;
      pointY = (boundaries.topY + boundaries.bottomY) / 2;
      break;
  }

  return { x: pointX, y: pointY };
}
