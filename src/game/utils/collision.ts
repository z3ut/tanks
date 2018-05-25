import { Boundaries } from '../core/boundaries';

export function isCollided(boundary1: Boundaries, boundary2: Boundaries): boolean {
  return boundary1.leftX <= boundary2.rightX &&
    boundary1.rightX >= boundary2.leftX &&
    boundary1.topY <= boundary2.bottomY &&
    boundary1.bottomY >= boundary2.topY;
}

export function isInside(inner: Boundaries, outer: Boundaries) {
  return outer.leftX <= inner.leftX &&
    outer.rightX >= inner.rightX &&
    outer.topY <= inner.topY &&
    outer.bottomY >= inner.bottomY;
}

export function isIntersect(boundaries: Boundaries, x: number, y: number): boolean {
  return boundaries.bottomY <= y &&
    boundaries.rightX >= y &&
    boundaries.leftX <= x &&
    boundaries.rightX >= x;
}
